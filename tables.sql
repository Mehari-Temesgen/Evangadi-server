CREATE TABLE IF NOT EXISTS users(
    userid int NOT null AUTO_INCREMENT,
    firstname varchar(30) not null,
    lastname varchar(30) not null,
    email varchar(40) not null,
    password varchar(100) not null,
    PRIMARY KEY(userid)
    );
  CREATE TABLE questions (
      id int(20) not null AUTO_INCREMENT,
      questionsid varchar(100) not null UNIQUE,
      userid int not null,
      title varchar(50) not null,
      description varchar(255) not null,
      tag varchar(20),
      PRIMARY KEY(id,questionsid),
      FOREIGN KEY(userid) REFERENCES users(userid)
      );
      CREATE TABLE answers(
         answerid int not null AUTO_INCREMENT,
         userid int not null,
         questionsid varchar(100) not null,
         answer varchar(255) not null,
          PRIMARY KEY(answerid),
          FOREIGN KEY(questionsid) REFERENCES questions(questionsid),
          FOREIGN KEY(userid) REFERENCES users(userid)
          );