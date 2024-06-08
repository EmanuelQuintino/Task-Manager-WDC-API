# Task-Manager-API

---

## Entity Relationship Diagram

![ERD](./tmp/drawSQL-food-explorer.png)

---

**Descrição:**

O Gerenciador de Tarefas é uma aplicação web full-stack desenvolvida como projeto de conclusão do curso de Desenvolvimento Web do Reprograma Jucás. Esta aplicação permite aos usuários organizar suas tarefas de forma eficiente, oferecendo recursos avançados de gestão e colaboração.

---

**Recursos Principais:**

- **Cadastro e Autenticação Seguros:** Utiliza JWT e bcrypt para garantir a segurança dos dados do usuário.
- **Interface Intuitiva e Responsiva:** Desenvolvida com React e Styled Components, a interface oferece uma experiência de usuário agradável em dispositivos de diferentes tamanhos.
- **Gestão Flexível de Tarefas:** Adicione, edite e remova tarefas facilmente, com recursos avançados como ordenação, filtragem e categorização.
- **Monitoramento em Tempo Real:** Receba notificações instantâneas sobre atualizações nas tarefas, permitindo um acompanhamento em tempo real.
- **Colaboração Eficiente:** Compartilhe tarefas e projetos com colegas de equipe, atribua responsabilidades e trabalhe de forma colaborativa.

---

## Technologies

- `Node.js`
- `Typescript`
- `Express`
- `JSON Web Token (JWT)`
- `Bcrypt`
- `Sqlite`
- `Zod`

## Installation

```bash
# Clone project
$ git clone https://github.com/EmanuelQuintino/Task-Manager-API.git

# Install dependencies
$ npm install

# Run API
$ npm run dev
```

## Environment Variables

```ini
PORT=""
SECRET_TOKEN=""
EXPIRESIN_TOKEN=""
KEY_TOKEN=""
```

## Links

- [Deploy](https://project-food-explorer.netlify.app/)
- [Client-Side Repository](https://github.com/EmanuelQuintino/Food-Explorer)
