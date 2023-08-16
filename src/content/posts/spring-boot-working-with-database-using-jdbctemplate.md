---
datetime: 2022-09-01T01:04:50.000Z
title: "Spring Boot: Working With Database Using JDBCTemplate"
tags:
  - java
  - spring
---

In this tutorial, we'll learn how to connect a Spring Boot application with a relational database using JDBCTemplate. First, some background on why JDBCTemplate is used.

## Introduction

In the Java world, the tool that's used to integrate a database with the language is called Java Database Connectivity (JDBC). JDBC allows you to connect to a DBMS to work with databases. However, JDBC is very verbose, you have to write a lengthy block of code just to execute a simple SQL query, which is not very comfortable to use. Here is an example:

```java
String sql = "INSERT INTO student VALUES (?,?)";
try (PreparedStatement st = con.prepareStatement(sql)) {
    st.setString(1, name);
    st.setInt(2, age);
    st.executeUpdate();
} catch (SQLException e) {
   // handle exceptions
}
```

Spring's JDBCTemplate comes to the rescue. JDBCTemplate reduces the verbosity of plain JDBC considerably, which you will see in the following tutorial.

## Creating A CRUD App

In this tutorial, we'll be creating a backend service that exposes 3 endpoints: adding a record to the database, removing a record from the database, and showing all the records in the database.

We'll be working with a PostgreSQL database. Inside, there'll be a table called _student_ with 3 columns.

1. id -- An auto-incrementing integer.
2. name -- The name of the student.
3. age -- The age of the student.

_Note: the examples in this tutorial will work with any relational database technology you choose with some minor adjustments. I also assume that you have some basic knowledge of Java, Spring Boot, JDBC, and SQL._

#### Generate Spring Boot Project

First, let's use [Spring Initializr](https://start.spring.io/) to generate the base for our app. We need to include these dependencies inside the generated _pom.xml_.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
 </dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

The last dependency is the JDBC Driver for your chosen database, which is PostgreSQL in this case. Also, the reason we add `<scope>runtime</scope>` is because the app only needs the JDBC driver at runtime, it's not needed for compilation.

### Configure Database

Next, let's define our table by creating a file in `/src/main/resources/` called `schema.sql`.

```sql
CREATE TABLE IF NOT EXISTS student(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL
);
```

Next, we have to tell Spring how to connect to our application. We can do this by changing the `application.properties` file located in `/src/main/resources/` to look like this:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/test
spring.datasource.username=root
spring.datasource.password=secret
spring.sql.init.mode=always
```

Going from the first line: your connection URL, your DB username, your DB password, and the last line is there to instruct Spring Boot to always run your `schema.sql` file you defined earlier every time your start the app.

### Create Model Class

Now that we're done with the basic configuration for the database, let's start working on our app. First, we'll create a model class called `Student` that models our table structure.

```java
package com.example.model;

public class Student {

    private int id;
    private String name;
    private int age;

    // constructor, getters, and setters
}
```

### Create Repository Class

Next, we define `StudentRepository` which is a bean in the application context that'll be used by our controller to interact with the database.

```java
package com.example.repository;

@Repository
public class StudentRepository {

}
```

Since `StudentRepository` is a bean in the application context, we can inject an instance of `JdbcTemplate` that we'll use to work with the database.

At this point, you must be wondering where the instance of `JdbcTemplate` is coming from. This is part of Spring Boot's magic. When Spring Boot detects that you have PostgreSQL as a dependency, it automatically configures a `DataSource` and a `JdbcTemplate` instance for you.

Later in the tutorial, I'll show you how to define your own `DataSource` and `JdbcTemplate` instances when you need them.

The code block below shows you how to inject the `JdbcTemplate`.

```java
package com.example.repository;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbc;

    public StudentRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
}
```

Now that we have the `JdbcTemplate` instance, we can start working on our CRUD jobs. All we have to do is to pass the SQL and its parameters to a method called `update()` of the instance. The method abstracts away all the JDBC steps that we have to do.

First, let's work on the method to insert and delete a record from the table as they're pretty straightforward. We'll call them `addStudent()` and `deleteStudent` respectively.

```java
public class StudentRepository {
    // codes omitted

    public void addStudent(Student student) {
        String sql = "INSERT INTO student (name, age) VALUES (?, ?)";

        jdbc.update(sql, student.getName(), student.getAge());
    }

    public void deleteStudent(int id) {
        String sql = "DELETE FROM student WHERE id = ?";

        jdbc.update(sql, id);
    }
}
```

See how more succinct it is than working directly with JDBC provided by the JDK.

Retrieving data involves more steps, but it's also not that difficult. We'll now work on the method to retrieve all records from the table called `findAll()`.

```java
public class StudentRepository {
    // codes omitted

    public List<Student> findAll() {
        String sql = "SELECT * FROM student";

        RowMapper<Student> studentRowMapper = (r, i) -> {
            int id = r.getInt("id");
            String name = r.getString("name");
            int age = r.getInt("age");

            return new Student(id, name, age);
        };

        return jdbc.query(sql, studentRowMapper);
    }
}
```

Notice that this time we're using `jdbc.query()` instead of `jdbc.update()`. The `query()` method takes two parameters, the SQL command, and a `RowMapper`. `RowMapper` is responsible for transforming a row from the `ResultSet` into a specific object. In this case, the `Student` object which our app knows how to work with.

### Create Controller Class

Now that we are done with our repository object that's in charge of CRUD, the final step is to expose these methods through endpoints. In other words, it's time to implement the controller.

```java
package com.example.controller;

@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping
    public void addStudent(@RequestBody Student student) {
        studentRepository.addStudent(student);
    }

    @DeleteMapping
    public void deleteStudent(@RequestBody Student student) {
        studentRepository.deleteStudent(student.getId());
    }

    @GetMapping
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }
}
```

We use constructor dependency injection to get the repository object from the Spring context, then we implement the 3 endpoints to execute the CRUDs method from our `StudentRepository`.

In case you are wondering why the GET endpoint knows that `List<Student>` has to be returned to the client in JSON format, the answer is, again, Spring Boot's magic. By adding the `@RestController` annotation instead of vanilla `@Controller`, we don't need to explicitly convert POJO to JSON. Spring Boot will handle it for us.

## Wrap Up

And that's it. We're done with the app. You can start the app and test the endpoints using your favorite API testing tools like _Postman_ or _cURL_.

_Note: when calling the POST and DELETE endpoints, you have to attach a request body containing a JSON that model the `Student` object and contains an `id` respectively._

Here is an example of how the request body should look like when calling the POST endpoint:

```json
{
	"name": "John",
	"age": 17
}
```

You can ignore the _id_ field because it's managed by the database as per our schema definition earlier.

Here is an example of how the request body should look like when calling the DELETE endpoint:

```json
{
	"id": 1
}
```

Finally, you can find the source code for this tutorial [here](https://github.com/tanerijun/jdbctemplate-example).

## Bonus: Creating Custom Data Source

Spring automatically configures a `DataSource` bean for you based on the content of your `application.properties` file. This is what you need most of the time, but there might come a time when you also have to define your own `DataSource` bean.

For example:

- Your `DataSource` implementation might depend on some condition at runtime.
- You need multiple `DataSource` instances.
- You are using vanilla Spring.

To define `DataSource` yourself, you have to make a custom configuration class. Inside the class, you define a method annotated with `@Bean`. The `DataSource` is simply a bean that you can add to the Spring context just like any other bean. Here is an example:

```java
@Configuration
public class ProjectConfiguration {

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();

        dataSource.setJdbcUrl(dataSourceUrl);
        dataSource.setUsername(dataSourceUsername);
        dataSource.setPassword(dataSourcePassword);
        dataSource.setConnectionTimeout(1000);

        return dataSource;
    }
}
```

I'm using Hikari Connection Pool because it's the default in Spring, but feel free to use any implementation you prefer.
