'use strict'

{
  let IsPlay = true;  // グローバル
  let timeoutId;  // グローバル

  // -------- メニュータブ切替
  function menuClick() {    
    const menuItems = document.querySelectorAll('nav li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(menuItem => {
      menuItem.addEventListener('click', e => {
        // リロード防止
        e.preventDefault();

        menuItems.forEach(item => {
          item.classList.remove('active');
        });
        menuItem.classList.add('active');

        contents.forEach(content => {
        content.classList.remove('active');
        });
        
        document.getElementById(menuItem.dataset.id).classList.add('active');
      });
    });
  }

  // ----------------- 画像の切替用ボタン作成
  function setupDots() {    
    const event_ul = document.querySelector('.event_contents ul');
    const slides = event_ul.children;
    const dots = [];   //button格納用配列
    let currentIndex = 0;

    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');  //button作成

      // ボタンをクリックしたときの処理
      button.addEventListener('click', e => {
        // リロード防止
        e.preventDefault();
        // 全ての外す
        dots.forEach(dot => {
          dot.classList.remove('current');
        });

        // clickされた要素 = i
        currentIndex = i;
        // clickされた要素に追加→メソッド実行
        dots[currentIndex].classList.add('current');

        const slideWidth = slides[0].getBoundingClientRect().width;
        event_ul.style.transform = `translateX(${-1 * slideWidth * currentIndex}px)`;
        slides[0].classList.add()
      });

      // 作成したボタンを配列に入れる→親要素(.dots_container)に子要素(button)として追加
      dots.push(button);
      document.querySelector('.dots_container').appendChild(button);
    }

    // 最初のボタンに色を付ける
    dots[currentIndex].classList.add('current');
  }

  // ----------------- スライドショーの実行
  function slideShow() {
    
    // 画像を取得する
    const event_imgAll = document.querySelectorAll('.event_contents ul li');
    let imgIndex = 1;

    timeoutId = setTimeout(() => {
      const dots_btnAll = document.querySelectorAll('.dots_container button');

      // 選択中のボタンの位置を取得
      for (let i = 0; i < dots_btnAll.length; i++) {
        const IsDot = dots_btnAll[i].classList.contains('current');
        if (IsDot) {
          imgIndex = i + 1;
        }
      }

      if (imgIndex < event_imgAll.length) {
        dots_btnAll[imgIndex].click();
        dots_btnAll[imgIndex].animate([{opacity: '.7'}, {opacity: '1'}], 1000);
        event_imgAll[imgIndex].animate([{opacity: '0'}, {opacity: '1'}], 2000);
        slideShow();
        imgIndex++;
      } else {
        dots_btnAll[0].click();
        slideShow();          
      }
    }, 3000);    
  }

  // ----------------- スライドショーのタイトルをクリックで止める
  function slidersStop() {
    document.querySelector('.infomation h2').addEventListener('click', () => {
      if (IsPlay){
        clearTimeout(timeoutId);
        IsPlay = !IsPlay;
      } else {
        slideShow();
        IsPlay = !IsPlay;
      }
    });
  }
  
  // ----------------- newsテーブル作成
  function createTable() {   

    // 設置するスペースを取得
    const tableSpace = document.querySelector('.table_space');    
    // 要素を作成
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");    
    // セルの作成（値は配列で準備）
    let newsContents = createNewsContents();
    
    for (let i = 0; i < newsContents.length; i++) {
      const tr = document.createElement("tr");
      let td_day = document.createElement("td");
      let td_content = document.createElement("td");
      let tdDate = document.createTextNode(newsContents[i][0]);
      let tdText = document.createTextNode(newsContents[i][1]);

      td_day.appendChild(tdDate);
      td_content.appendChild(tdText);
      tr.appendChild(td_day);
      tr.appendChild(td_content);      
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    tableSpace.appendChild(table);
  }
  
  // ----------------- Newsエリアに格納する値の作成（配列）
  function createNewsContents() {      
    const newsContents = [
      ["2024/9/21", "クラシックページを更新"],
      ["2024/9/15", "イベントをページを更新"],
      ["2024/9/11", "レイアウトを更新"],
      ["2024/9/7", "イベントページを更新"],
      ["2024/9/3", "トップページを作成"],
      ["2024/9/1", "ホームページを開設"],
    ];
    return newsContents;
  }

  // ----------------- フェードイン（引数：対象のセレクター、秒数）
  function fadeInOpacity(selName, setMin) {
    const getSel = document.querySelector(selName);
    getSel.animate([{opacity: '0'}, {opacity: '1'}], setMin);
  }
  
  // ----------------- エリア拡大縮小切替
  function expandBotton() {  
    const btnItem = document.querySelector('.button_more');
    const contentObjects = document.getElementsByClassName('explanation_contents');
    const contentObject = contentObjects[0];

    btnItem.addEventListener('click', e => {
      // 再読み込み停止
      e.preventDefault();
      
      // 表示されているかチェック
      const result = contentObject.classList.contains('listoverflowAuto');
      
      // 処理内容
      if (result) {
        contentObject.classList.remove('listoverflowAuto');
        contentObject.classList.add('listoverflowHidden');
        btnItem.textContent = 'READ MORE';
      } else {
        contentObject.classList.add('listoverflowAuto');
        contentObject.classList.remove('listoverflowHidden');
        btnItem.textContent = 'Close';
        // スクロールの非表示クラス
        contentObject.classList.add('scroll_hidden');
      }
    });
    // 初期値
    contentObject.classList.add('listoverflowHidden');
    btnItem.textContent = 'READ MORE';
  }

  // ----------------- 実行
  setupDots();      // ボタン作成
  menuClick();      // メニュー動作
  createTable();    // テーブル作成
  expandBotton();   // エリア拡大縮小切替
  slideShow();      // スライドショー開始
  slidersStop();    // スライドショー停止
  fadeInOpacity('header h1', 2000);     // タイトル画像をゆっくり表示
  fadeInOpacity('header img', 2000);    // スライド画像をゆっくり表示
  
}