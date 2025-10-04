window.addEventListener("load", (event) => {
    const parent = document.querySelector('.parent');
    const createBtn = document.querySelector('.button1');

    createBtn.addEventListener('click', (e) => {
      new minipop(parent, e.clientX, e.clientY, '이 팝업은 new로 생성됨');
    });
    const testdataset = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    const contents =  document.querySelector('.minipopGridcontainer');
    testdataset.forEach(e=>{
        contents.innerHTML = `${contents.innerHTML}
        <div class="minipop-row">
            <div><label class="checkbox-wrapper"><input type="checkbox"></label></div>
            <div>데이터${e}-1</div>
            <div>데이터${e}-2</div>
            <div>데이터${e}-3</div>
        </div>
`
    })
  });