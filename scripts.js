class PostList extends HTMLElement {
  constructor() {
    super();

    this.items = [];

    this.shadow = this.attachShadow({mode: 'open'});
    this.wrapper = document.createElement('section');
    const style = document.createElement('style');

    style.textContent = `
      .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;
      }
      
      .item {
        background: #cef;
        padding: 5px 15px;
      }
      
      h2 {
        color: #458;
      }
      
      p {
        color: #123;
        font-family: 'Arial';
        font-size: 15px;
        line-height: 18px;
      }
    `;

    this.wrapper.classList.add('list');
    this.shadow.appendChild(style);
    this.shadow.appendChild(this.wrapper);
  }

  // Элемент добавлен в DOM
  connectedCallback() {
    this.getData();
  }

  async getData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
    const res = await data.json()

    this.items = res || [];

    this.createList();
  }

  createList() {
    this.items.forEach(item => {
      const article = document.createElement('article');
      const title = document.createElement('h2');
      const text = document.createElement('p');

      article.setAttribute('class', 'item');
      title.textContent = item.title;
      text.textContent = item.body;
      article.appendChild(title);
      article.appendChild(text);
      this.wrapper.appendChild(article);
    });
  }
}

customElements.define('post-list', PostList);