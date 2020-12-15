document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const doodler = document.createElement('div')
    let doodlerLeftSpace = 50
    let doodlerBottomSpace = 150
    let isGameOver = false
    let platforms = []
    let upTimerId
    let downTimerId
  
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
    
    function createDoodler() {
      grid.appendChild(doodler)
      doodler.classList.add('doodler')
      doodlerLeftSpace = platforms[0].left
      doodler.style.left = doodlerLeftSpace + 'px'
      doodler.style.bottom = doodlerBottomSpace + 'px'
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

    function jump() {
        clearInterval(downTimerId)
        upTimerId = setInterval(function () {
          doodlerBottomSpace += 20
          doodler.style.bottom = doodlerBottomSpace + 'px'
          if (doodlerBottomSpace > (startPoint + 200)) {
            fall()
          }
        },30)
    }

    function fall() {
        clearInterval(upTimerId)  
        downTimerId = setInterval(function () {
            doodlerBottomSpace -= 5
            doodler.style.bottom = doodlerBottomSpace + 'px'
            if (doodlerBottomSpace <= 0) {
                gameOver()
            }
        },20)
    }

    function movePlatforms() {
        if (doodlerBottomSpace > 200) {
            platforms.forEach(platform => {
              platform.bottom -= 4
              let visual = platform.visual
              visual.style.bottom = platform.bottom + 'px'
    
              if(platform.bottom < 10) {
                let firstPlatform = platforms[0].visual
                firstPlatform.classList.remove('platform')
                platforms.shift()
                console.log(platforms)
                score++
                var newPlatform = new Platform(600)
                platforms.push(newPlatform)
              }
        }) 
    }



    function start() {
        if (!isGameOver) {
          createDoodler()
          createPlatforms()
          setInterval(movePlatforms,30)
          jump()
          
        } 
    }

    function gameOver() {
        isGameOver = true
        clearInterval(upTimerId)
        clearInterval(downTimerId)
    }

    start()
    }
})