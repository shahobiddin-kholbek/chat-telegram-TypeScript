const express = require("express");
const app = express();

const cors = require("cors");
const port = 3002;

import { Request, Response } from "express";

var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

app.use(cors());
app.use(express.json());

//Telegram
const contacts: Contact[] | [] = [
  {
    id: 1,
    name: "Shahob",
    lastname: "Kholbekzoda",
    img: "../../img/shahob_icon.jpg",
  },
  {
    id: 2,
    name: "Nur",
    lastname: "Nurov",
    img: "../../img/nur-icon.jpg",
  },
  {
    id: 3,
    name: "Said",
    lastname: "Saidov",
    img: "../../img/said-icon.jpg",
  },
  {
    id: 4,
    name: "Aziz",
    lastname: "Azizov",
    img: "../../img/aziz-icon.jpg",
  },
];

type Contact = {
  id: number;
  name: string;
  lastname: string;
  img: string;
};

app.get("/contacts", (req: Request, res: Response) => {
  res.send(contacts);
});

type Message = {
  id: string;
  recieverId: string;
  senderId: number;
  content: string;
};
let messages: Message[] = [];
const dataFromLC: Message[] | undefined = JSON.parse(
  localStorage.getItem("messages")
);
if (dataFromLC) {
  messages = dataFromLC;
}

app.post("/input-messages", (req: Request, res: Response) => {
  messages.push(req.body);
  localStorage.setItem("messages", JSON.stringify(messages));
  res.send(JSON.stringify(""));
});

app.get("/messages", (req: Request, res: Response) => {
  res.send(messages);
});

app.delete("/messages/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  messages = messages.filter((msg) => {
    return (msg.id !== id);
  });
  localStorage.setItem("messages", JSON.stringify(messages));
  res.send(JSON.stringify("Msg deleted!!!"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
