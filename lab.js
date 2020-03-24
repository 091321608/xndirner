
  /*
  Task 1 Paxnogh smilik
  // random position, onmouseenter
  function getRandomPosition (element) {
    let x = window.innerHeight - element.clientHeight;
    let y = window.innerWidth-element.clientWidth;
    let randomX = Math.floor (Math.random () * x);
    let randomY = Math.floor (Math.random () * y);
    return [randomX, randomY];
  }
  function getPos (img) {
    let xy = getRandomPosition (img);
    img.style.top = xy [0] + 'px';
    img.style.left = xy [1] + 'px';
  }
  window.onload = function () {
    let img = document.createElement ('IMG');
    img.classList.add('pulse-image');
    img.src = "images/smilik-3.jpg";
    document.body.appendChild(img);
    getPos(img);

    img.onmouseenter = ()=> {
      getPos(img);
    }
  }*/
  // random position, onmouseenter


  // Task 2 Kubikner
  //input,button,create element,OOP,constructor

  // const _constructor = {
  //   input: null,
  //   button: null,
  //   parent: null,
  //   init:function () {
  //     this.parent = document.createElement("DIV");
  //     document.body.appendChild(this.parent);
  //     this.drawInput();
  //   },
  //   drawInput: function () {
  //     this.input = document.createElement("INPUT");
  //     this.button = document.createElement("BUTTON");
  //     this.button.innerText = 'Draw';
  //     this.button.className = 'draw-button';
  //     this.input.placeholder = 'enter the number of squares';
  //     this.input.className = 'input-area';
  //     [this.input, this.button].map(elem => document.body.appendChild(elem));
  //     this.button.onclick = () => this.drawNet(this.input.value);
  //   },
  //   drawNet: function (count) {
  //     this.parent.innerHTML = '';
  //     for (let i = 0; i< +count; i++) {
  //       if (i > 0) {
  //         const _br = document.createElement('BR');
  //         this.parent.appendChild(_br);
  //       }
  //       for (let j = 0; j< +count; j++) {
  //         const div = document.createElement('DIV');
  //         div.className = 'square';
  //         this.parent.appendChild(div);
  //         let prevColor = null;
  //         div.onclick = () => {
  //           div.innerText = (i + 1) + ':' + (j + 1);
  //           console.log(i + 1, j + 1);
  //         };
  //         div.onmouseenter = () => {
  //           div.style.backgroundColor = '#'+Math.random().toString(16).substr(2,6);
  //         };
  //         div.onmouseleave = () => {
  //           div.style.backgroundColor = prevColor
  //         }
  //       }
  //     }
  //   }
  // };
  // _constructor.init();

  //Task3 Tank
  //   input type range,
  //   Math.sin to ret rotate degree,
  //   transition() by JS,
  //   position x,y(moving)

  const _constructor = {
    inputRange: null,
    parent: null,
    body: null,
    valueSpan: null,
    lifeBar: null,
    lifeBarFill: null,
    tankIcon: null,
    dangerBorder: null,
    countBombs: 0,
    imgTank: {
      height: 40,
      width: 80,
    },
    movingTimeout: null,
    disableClick: true,
    borderWidth: 40,
    lifePercentage: 100,
    init: function () {
      this.parent = document.createElement("DIV");
      document.body.appendChild(this.parent);
      this.makeHeader();
      this.makeBody();
    },
    setAttributes: (el, attrs) => {
      for(let key in attrs) {
        el.setAttribute(key, attrs[key]);
      }
    },
    get CountBombs () {
      this.valueSpan.innerHTML = '<img width="40" height="40" src="images/bomb.png">' + ' : ' + this.countBombs
    },
    set lifeLevel (width) {
      let bgColor = 'seagreen';
      if (width <= 70 && width > 40) bgColor = 'yellow';
      else if (width <= 40) bgColor = 'red';
      if (width <= 0) {
        document.querySelector('.tank-icon').src = './images/gmboc.gif';
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
      this.setAttributes(this.lifeBarFill, {style: `background-color: ${bgColor};width: ${width + '%'}`});
    },
    makeHeader: function () {
      const header = document.createElement("DIV");
      this.inputRange = document.createElement("INPUT");
      this.tankIcon = document.createElement("IMG");
      this.tankIcon.className = 'tank-icon-header';
      this.setAttributes(this.inputRange, {type: 'range',min: 0, max: 2, step: 0.001, value: 1});
      this.valueSpan = document.createElement('SPAN');
      this.CountBombs;
      this.setAttributes(this.tankIcon, {width: '50px',height: '30px',src:'images/tank.png'});

      // Tank Life level
      this.lifeBar = document.createElement("DIV");
      this.lifeBar.className = 'life-bar';
      this.lifeBarFill = document.createElement("SPAN");
      this.lifeBarFill.className = 'life-bar-fill';
      this.lifeBar.appendChild(this.lifeBarFill);

      this.lifeLevel  = this.lifePercentage;
      [this.inputRange, this.valueSpan, this.tankIcon, this.lifeBar].map(_elem => header.appendChild(_elem));
      this.parent.appendChild(header);
        this.inputRange.onchange = function (e) {
        let val = this.value;
      }
    },
    tankCoords: function (tank) {
      return {
        x: tank.getBoundingClientRect().left,
        y: tank.getBoundingClientRect().top,
        width: tank.getBoundingClientRect().width,
        height: tank.getBoundingClientRect().height,
      }
    },
    tankMoving: (x, y, element) => {
      element.style.top = y + 'px';
      element.style.left = x + 'px';
    },
    makeBody: function() {
      this.body = document.createElement("DIV");
      this.body.className = 'battlefield';
      this.dangerBorder = document.createElement("DIV");
      this.dangerBorder.className = 'danger-border';
      const tank_parent = document.createElement("SPAN");
      tank_parent.className = 'tank_parent';
      const tank = document.createElement("IMG");
      this.setAttributes(tank_parent, {
        style: `transition: ${this.value}s`
      });
      this.setAttributes(tank, {
        class: 'tank-icon',
        src: "images/tank.png"
      });
      this.lifeLevel = tank.src;
      tank_parent.appendChild(tank);
      this.dangerBorder.appendChild(tank_parent);
      this.body.appendChild(this.dangerBorder);
      this.parent.appendChild(this.body);
      this.dangerBorder.onclick = (e) => {
        if (!this.disableClick) return;
        this.disableClick = false;

        if (this.movingTimeout) clearTimeout(this.movingTimeout);
        const iconBomb = document.createElement("IMG");
        this.setAttributes(iconBomb, {
          class: 'body-bomb-icon',
          width: 20 + 'px',
          height: 20 + 'px',
          style: `left: ${e.pageX - this.body.offsetLeft - this.borderWidth - 10}px; top: ${e.pageY - this.body.offsetTop - this.borderWidth - 10}px`,
          src: 'images/bomb.png'});
        const tankCoords = this.tankCoords(tank);
        let tankX = tankCoords.x + tankCoords.width / 2;
        let tankY = tankCoords.y + tankCoords.height / 2;
        tank.style.transform = "rotate(" + Math.atan2(e.clientY - tankY, e.clientX - tankX) + "rad)";
        tank.style.transition = '1s';

        if (this.dangerBorder.querySelector('.body-bomb-icon')) {
          this.dangerBorder.querySelector('.body-bomb-icon').remove()
        }
        this.dangerBorder.appendChild(iconBomb);
        this.movingTimeout = setTimeout(() => {
          tank_parent.style.transition = `${this.inputRange.value}s`;

          let tankLeft = e.pageX - this.body.offsetLeft - this.borderWidth;
          let tankTop =e.pageY - this.body.offsetTop - this.borderWidth;
          this.tankMoving(tankLeft, tankTop, tank_parent);

          setTimeout(() => {

            this.disableClick = true;
            this.countBombs++;
            this.CountBombs;
            console.log(tank.getBoundingClientRect().width / 2 + tank_parent.offsetLeft);
            console.log(tank_parent.offsetLeft + 40 - tank.getBoundingClientRect().width / 2 < 40);
            if(tank.getBoundingClientRect().width / 2 +  tank_parent.offsetLeft > 720) {
              this.lifePercentage-=10;
            } else if (tank_parent.offsetLeft + 40 - tank.getBoundingClientRect().width / 2 < 40) {
              this.lifePercentage-=10;
            } else if (tank.getBoundingClientRect().height / 2 +  tank_parent.offsetTop > 520) {
              this.lifePercentage-=10;
            } else if (tank_parent.offsetTop + 40 - tank.getBoundingClientRect().height / 2 < 40) {
              this.lifePercentage-=10;
            }
            this.lifeLevel = this.lifePercentage;
            iconBomb.remove()
          }, this.inputRange.value * 1000)
        }, 1000);

        // tank.style.top = `${e.pageY - this.body.offsetTop - (e.pageY - this.body.offsetTop + this.imgTank.height / 2) > this.body.offsetHeight ? this.imgTank.height / 2 : 0}px`;

      }
    }
  };
  _constructor.init();
