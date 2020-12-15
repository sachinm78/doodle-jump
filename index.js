document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let isGameOver = false
    let platformCount = 5
    let platforms = []
    let doodlerLeftSpace = 50
    let startPoint = 150
    let doodlerBottomSpace = startPoint
    let upTimerId
    let downTimerId
    let isJumping = true
  
    class Platform {
      constructor(newPlatBottom) {
        this.left = Math.random() * 315
        this.bottom = newPlatBottom
        this.visual = document.createElement('div')
  
        const visual = this.visual
        visual.classList.add('platform')
        visual.style.left = this.left + 'px'
        visual.style.bottom = this.bottom + 'px'
        grid.appendChild(visual)
      }
    }
  
  
    function createPlatforms() {
      for(let i =0; i < platformCount; i++) {
        let platGap = 600 / platformCount
        let newPlatBottom = 100 + i * platGap
        let newPlatform = new Platform (newPlatBottom)
        platforms.push(newPlatform)
        console.log(platforms)
      }
    }
  
  
    function createDoodler() {
      grid.appendChild(doodler)
      doodler.classList.add('doodler')
      doodlerLeftSpace = platforms[0].left
      doodler.style.left = doodlerLeftSpace + 'px'
      doodler.style.bottom = doodlerBottomSpace + 'px'
    }
  
  function fall() {
    isJumping = false
      clearInterval(upTimerId)
      downTimerId = setInterval(function () {
        doodlerBottomSpace -= 5
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace <= 0) {
          gameOver()
        }
  
      },20)
  }
  
    function jump() {
      clearInterval(downTimerId)
      isJumping = true
      upTimerId = setInterval(function () {
        doodlerBottomSpace += 20
        doodler.style.bottom = doodlerBottomSpace + 'px'
        if (doodlerBottomSpace > (startPoint + 200)) {
          fall()
          isJumping = false
        }
      },30)
    }
  
  
    //assign functions to keyCodes
    function control(e) {
      doodler.style.bottom = doodlerBottomSpace + 'px'
      if(e.key === 'ArrowLeft') {
        moveLeft()
      } else if (e.key === 'ArrowRight') {
        moveRight()
      } else if (e.key === 'ArrowUp') {
        moveStraight()
      }
    }
  
    function gameOver() {
      isGameOver = true
      while (grid.firstChild) {
        console.log('remove')
        grid.removeChild(grid.firstChild)
      }
      grid.innerHTML = score
      clearInterval(upTimerId)
      clearInterval(downTimerId)
      clearInterval(leftTimerId)
      clearInterval(rightTimerId)
    }
  
  
    function start() {
      if (!isGameOver) {
        createPlatforms()
        createDoodler()
        setInterval(movePlatforms,30)
        jump(startPoint)
        document.addEventListener('keyup', control)
      } 
    }
    start()
})