---
datetime: 2022-09-03T03:22:27.000Z
title: Introduction To Transaction In Spring
slug: introduction-to-transaction-in-spring
featured: false
tags:
  - spring
description: "Explaining Transaction in Spring (The ELI5 way)."
---

In this post, we'll implement a simple Spring app to understand transaction. By the end of this post, you'll be equipped with the basic knowledge to work with transaction in Spring.

Let's start the tutorial by introducing the concept of transaction. What exactly is a transaction?

## What Is A Transaction

A transaction is a sequence of operations that are either executed successfully together or not at all. In the real-world scenario, transaction is often used to avoid data inconsistencies.

If any operations in the transaction were to fail, the transaction _rolls back_. In other words, the app is restored to how it was before the transaction happened.

If all the operations are executed successfully, all the changes that happened as a result of the transaction will be finalized. We often say that the transaction _commits_ in this case.

Let's look at a simple example of how transaction can be useful. Suppose you have a banking app, and it has the functionality of transferring money. The functionality implements these 2 steps:

1. Withdraw money from the sender's account.
2. Deposit the money to the receiver's account.

Imagine if the transaction at step 2 failed for some reason. What happened to the sender's money?

This is where transaction comes into play. In this case, the transaction will roll back the app to how it was before step 1 is executed. The sender's money will not be withdrawn. No harm done.

## Using Transaction In Spring

To implement transaction in Spring, all you have to do is to put the `@Transactional` annotation before a class or a method. If you put the method on a class, you tell Spring that every method in the class has to be transactional.

> Note: If you are not using Spring Boot, you'll have to add the `@EnableTransactionManagement` on your project's configuration class.

Behind the scene, Spring will configure an _aspect_ that intercepts all the methods annotated with `@Transactional`. The _aspect_ manages the transaction. If the transaction throws an exception, the changes will be rolled back, otherwise, they will be committed.

## Implementing An Example App

To clear things up, We'll create a simple app that mimics the scenario from the example above. Feel free to follow along or download the source code [here]().

> Note: I assume that you know the basics of Spring Boot and how to interact with a database using JDBCTemplate, which you can find more [here](https://blog.vitaneri.com/spring-boot-working-with-database-using-jdbctemplate).

### Generating App With Spring Initializr

First, use [Spring Initializr](https://start.spring.io/) to generate a Spring Boot project using these dependencies.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

For simplicity's sake, we will use [H2 memory database](https://www.h2database.com/), and use JDBCTemplate to interact with it.

### Configuring H2 Database

We'll keep the database simple. The database will contain a table called `account` with 3 columns: id, name, and money.

Therefore, our `schema.sql` in /src/main/resources/ will look like this:

```sql
CREATE TABLE account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    money DOUBLE NOT NULL
);
```

We then fill in 2 users in our table. A sender and a receiver, each with $100 in their account. We put these queries inside `data.sql` in /src/main/resources/.

```sql
INSERT INTO account (name, money) VALUES ('John Doe', 100);
INSERT INTO account (name, money) VALUES ('Jane Doe', 100);
```

> Note: Spring Boot will automatically execute these 2 files when we start our app.

### Create Model Object

_From this session onwards, we'll be working in the /src/main/java folder._

Next, let's create an object that models our table's row.

```java
package com.example.model;

public class Account {

    private int id;
    private String name;
    private double money;

    // Getters and setters
}
```

### Create Repository Object

Next, we'll create a repository object that'll be responsible for interacting with the database.

```java
package com.example.repository;

@Repository
public class AccountRepository {

    private final JdbcTemplate jdbc;

    public AccountRepository(JdbcTemplate jdbc) {
          this.jdbc = jdbc;
    }

    public void changeMoneyAmount(long id, double amount) {
        String sql = "UPDATE account SET money = ? WHERE id = ?";
        jdbc.update(sql, amount, id);
    }

    public Account findAccountById(long id) {
        String sql = "SELECT * FROM account WHERE id = ?";
        return jdbc.queryForObject(sql, new AccountRowMapper(), id);
    }

    public List<Account> findAllAccounts() {
        String sql = "SELECT * FROM account";
        return jdbc.query(sql, new AccountRowMapper());
    }
}
```

This is the implementation for the `AccountRowMapper` that we need to pass to `jdbc.query` to map the result of our query into a format that our application knows how to work with.

```java
package com.example.repository.mappers;

public class AccountRowMapper implements RowMapper<Account> {

    @Override
    public Account mapRow(ResultSet resultSet, int i) throws SQLException {
        Account a = new Account();
        a.setId(resultSet.getInt("id"));
        a.setName(resultSet.getString("name"));
        a.setMoney(resultSet.getDouble("money"));
        return a;
    }
}
```

### Create Service Object

Since this service object contains logic that enables our app to transfer money, we'll name it `TransferService`. The class will receive an instance of `AccountRepository` from the Spring context to interact with our database. And the logic will be inside the `transferMoney()` method annotated with `@Transactional`.

```java
package com.example.service;

@Service
public class TransferService {

    private final AccountRepository accountRepository;

    public TransferService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Transactional
    public void transferMoney(long senderId, long receiverId, double amount) {
        Account sender = accountRepository.findAccountById(senderId);
        Account receiver = accountRepository.findAccountById(receiverId);

        double senderNewMoney = sender.getMoney() - amount;
        double receiverNewMoney = receiver.getMoney() + amount;

        accountRepository.changeMoneyAmount(senderId, senderNewMoney);
        accountRepository.changeMoneyAmount(receiverId, receiverNewMoney);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAllAccounts();
    }
}
```

### Create Controller Class

Now that we have implemented our logic for transferring money, the final step is to expose it with a Controller. Below is the code for our Controller class.

```java
package com.example.controller;

@RestController
public class AccountController {

    private final TransferService transferService;

    public AccountController(TransferService transferService) {
        this.transferService = transferService;
    }

    @PostMapping("/transfer")
    public void transferMoney(@RequestBody TransferRequest request) {
        transferService.transferMoney(request.getSenderId(), request.getReceiverId(), request.getAmount());
    }

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return transferService.getAllAccounts();
    }
}
```

We also need a data transfer object called `TransferRequest` that models our HTTP request body.

```java
package com.example.dto;

public class TransferRequest {
    private long senderId;
    private long receiverId;
    private double amount;

    // Getters and setters
}
```

### Running Our App

We're now done implementing our app. Let's run the app and try calling its endpoints with an API testing tool (Postman, cURL, etc.).

This is what I did:

1. Send a POST request to the `/transfer` route, with the request body below.

```json
{
	"senderId": 1,
	"receiverId": 2,
	"amount": 20
}
```

2. Send a GET request to the `/accounts` route, and get back the following JSON.

```json
[
	{
		"id": 1,
		"name": "John Doe",
		"money": 80.0
	},
	{
		"id": 2,
		"name": "Jane Doe",
		"money": 120.0
	}
]
```

Seems like our app is working as expected. But how do we know if the `@Transactional` annotation really works? We are going to prove that in the next section.

### Testing The `@Transaction` Annotation

To test if the `@Transaction` annotation really works, let's throw a `RuntimeException` in our `transferMoney()` method.

```java
@Transactional
public void transferMoney(long senderId, long receiverId, double amount) {
    Account sender = accountRepository.findAccountById(senderId);
    Account receiver = accountRepository.findAccountById(receiverId);

    double senderNewMoney = sender.getAmount().subtract(amount);
    double receiverNewMoney = receiver.getAmount().add(amount);

    accountRepository.changeMoneyAmount(senderId, senderNewAmount);
    accountRepository.changeMoneyAmount(receiverId, receiverNewAmount);

    throw new RuntimeException("Problem executing transaction.");
}
```

Now let's restart the app and call the endpoints again.

1. Send a POST request to the `/transfer` route, with the request body below.

```json
{
	"senderId": 1,
	"receiverId": 2,
	"amount": 20
}
```

2. Send a GET request to the `/accounts` route. And unsurprisingly, the result is different from our first application run. The `@Transactional` annotation did work as expected.

```json
[
	{
		"id": 1,
		"name": "John Doe",
		"money": 100.0
	},
	{
		"id": 2,
		"name": "Jane Doe",
		"money": 100.0
	}
]
```

Because there's an error, the transaction rollback our application. That's why there's no change at all. The app is just like it was before we execute the `transferMoney()` method.

And if you check the log, you'll find `java.lang.RuntimeException: Problem executing transaction.` printed there.

Before we end the tutorial, let me introduce you to a common pitfall:
_Handling exceptions inside the method instead of throwing them._

This is a simple representation of the transaction aspect logic implemented by Spring.

```java
try {
    // your method's logic, part A
} catch (RuntimeException e) {
    // rollback logic, part B
}
```

If you handle the exception directly inside the method's logic (part A), it won't reach the catch block (part B). The aspect will never know that your method had an error, and thus, your changes will be committed, and no rollback will happen.

## Wrap Up

Congrats on making it to the end. I hope this short tutorial gives you an idea of how transaction work, and how important it is in a real-world application.
