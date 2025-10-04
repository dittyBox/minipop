window.addEventListener("load", (event) => {
    const parent = document.querySelector('.parent');
    const createBtn = document.querySelector('.button1');

    createBtn.addEventListener('click', (e) => {
      new minipop(parent, e.clientX, e.clientY, '이 팝업은 new로 생성됨');
    });
  });