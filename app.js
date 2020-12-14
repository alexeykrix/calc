const template =  `
  <div class="${localStorage.getItem('theme')? localStorage.getItem('theme'): 'calc'}">
    
    <header class="calc__header">
    <button class="theme">
      <svg id="bold" height="30" viewBox="0 0 24 24" width="30">
        <path class="lamp" d="m12 3.457c-.414 0-.75-.336-.75-.75v-1.957c0-.414.336-.75.75-.75s.75.336.75.75v1.957c0 .414-.336.75-.75.75z" />
        <path class="lamp" d="m18.571 6.179c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.061l1.384-1.384c.293-.293.768-.293 1.061 0s.293.768 0 1.061l-1.384 1.384c-.147.146-.339.22-.531.22z" />
        <path class="lamp" d="m23.25 12.75h-1.957c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.957c.414 0 .75.336.75.75s-.336.75-.75.75z" />
        <path class="lamp" d="m19.955 20.705c-.192 0-.384-.073-.53-.22l-1.384-1.384c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l1.384 1.384c.293.293.293.768 0 1.061-.147.147-.339.22-.531.22z" />
        <path class="lamp" d="m4.045 20.705c-.192 0-.384-.073-.53-.22-.293-.293-.293-.768 0-1.061l1.384-1.384c.293-.293.768-.293 1.061 0s.293.768 0 1.061l-1.384 1.384c-.147.147-.339.22-.531.22z" />
        <path class="lamp" d="m2.707 12.75h-1.957c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.957c.414 0 .75.336.75.75s-.336.75-.75.75z" />
        <path class="lamp" d="m5.429 6.179c-.192 0-.384-.073-.53-.22l-1.384-1.384c-.293-.293-.293-.768 0-1.061s.768-.293 1.061 0l1.384 1.384c.293.293.293.768 0 1.061-.148.146-.339.22-.531.22z" />
        <path class="lamp" d="m15 21v1.25c0 .96-.79 1.75-1.75 1.75h-2.5c-.84 0-1.75-.64-1.75-2.04v-.96z" />
        <path class="lamp" d="m16.41 6.56c-1.64-1.33-3.8-1.85-5.91-1.4-2.65.55-4.8 2.71-5.35 5.36-.56 2.72.46 5.42 2.64 7.07.59.44 1 1.12 1.14 1.91v.01c.02-.01.05-.01.07-.01h6c.02 0 .03 0 .05.01v-.01c.14-.76.59-1.46 1.28-2 1.69-1.34 2.67-3.34 2.67-5.5 0-2.12-.94-4.1-2.59-5.44zm-.66 5.94c-.41 0-.75-.34-.75-.75 0-1.52-1.23-2.75-2.75-2.75-.41 0-.75-.34-.75-.75s.34-.75.75-.75c2.34 0 4.25 1.91 4.25 4.25 0 .41-.34.75-.75.75z" />
        <path class="lamp" d="m8.93 19.5h.07c-.02 0-.05 0-.07.01z" />
        <path class="lamp" d="m15.05 19.5v.01c-.02-.01-.03-.01-.05-.01z" />
      </svg>
    </button>
      <div class="oldView"></div>
      <div class="realView">0</div>
    </header>
    <main class="calc__main">
      <button data-id="del" class="btn btn-actions">AC</button>
      <button data-id="invert" class="btn btn-actions">+/-</button>
      <button data-id="percent" class="btn btn-actions">%</button>
      <button data-id="split" class="btn btn-actions">÷</button>
      <button data-id="7" class="btn">7</button>
      <button data-id="8" class="btn">8</button>
      <button data-id="9" class="btn">9</button>
      <button data-id="multy" class="btn btn-actions">×</button>
      <button data-id="4" class="btn">4</button>
      <button data-id="5" class="btn">5</button>
      <button data-id="6" class="btn">6</button>
      <button data-id="minus" class="btn btn-actions">-</button>
      <button data-id="1" class="btn">1</button>
      <button data-id="2" class="btn">2</button>
      <button data-id="3" class="btn">3</button>
      <button data-id="plus" class="btn btn-actions">+</button>
      <button data-id="comma" class="btn">,</button>
      <button data-id="0" class="btn">0</button>
      <button data-id="eval" class="btn btn-evaluate">=</button>
    </main>
  </div>
`

let elem = document.createElement('div')
elem.innerHTML = template
document.body.appendChild(elem)
let value = ''

let values = ['']

const main = elem.querySelector('main'),
header = elem.querySelector('header'),
viewEval = elem.querySelector('.realView'),
viewOld = elem.querySelector('.oldView'),
theme = elem.querySelector('.theme')

const setEval = (ev) => {
  viewEval.innerHTML = ev
  if (ev.length > 10) {
    if (ev.length > 18) viewEval.classList = 'realView xsmall'
    else viewEval.classList= 'realView small'
  }
  else viewEval.classList = 'realView'
}

const setOld = (ev) => viewOld.innerHTML = ev

const evalHandler = (i,  t) => {
  let expression = ''
  values.forEach( el => {
    if (el === '-') expression += '-' 
    else if (el === '÷') expression += '/' 
    else if (el === '×') expression += '*' 
    else if (el === '+') expression += '+' 
    else expression += el
  })

  value = eval(expression).toFixed(8)
  if (value.indexOf('.') > 0) {
    value = parseFloat(value)
  }

  let old = ''
  values.forEach( el => old += el + ' ')
  setOld(old)
  setEval('= '+ (!isNaN(value) ? value :'&#8734;'))

  if (!t) return
  t.classList.add('anim-operators')
  setTimeout(()=> t.classList.remove('anim-operators'), 400)
} 

let holdTime = 0
let holdTimeount = null

document.addEventListener('mouseup', e => {
  let data = e.target.dataset.id
  if (data === 'del') {
    clearInterval(holdTimeount)
    holdTimeount = null
    holdTime = 0
  }
})

document.addEventListener('touchend', e => {
  
  let data = e.target.dataset.id
  if (data === 'del') {
    clearInterval(holdTimeount)
    holdTimeount = null
    holdTime = 0
  }
})

const actionHandler = (i, t, data) => {
  if (t) {
    t.classList.add('anim-operators')
    setTimeout(()=> t.classList.remove('anim-operators'), 400)
  }
  if (data === 'del') {
    holdTimeount = setInterval(() => {
      holdTime += 1
      if (holdTime >= 3) {
        clearInterval(holdTimeount)
        holdTimeount = null
        holdTime = 0
        values = ['']
        setOld('')
        setEval('0')
      }
    }, 100)

    if (value !== '') {
      value = ''
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
      setEval(values[i])
      return
    }
    if (values[i].length>1) {
      if (values[i].length === 2 && values[i][0] === '-') {
        values[i] = ''
      } else values[i] = values[i].slice(0, -1)
      setEval(values[i])
    } else {
      values[i] = ''
    }
    if (values[i] === '') {
      values = values.slice(0, -1)
    }

    i = values.length-1 > 0 ? values.length-1 : 0 
    
    let old = ''
    values.forEach((el, id) => {
      if (id === values.length-1) return
      if ((el === '-' || el === '÷' ||
          el === '×' || el === '+') && id === i ) return
      old += el + ' '
    })
    setOld(old)
    
    if (values.length === 0) {
      values.push('') 
      setEval(0)
    } else setEval(values[i])
  }
  if (data === 'percent') {
    if (values.length<3) return
    if (values[i] !== '-' &&
        values[i] !== '÷' &&
        values[i] !== '×' &&
        values[i] !== '+' ) {

        let expression = ''
        values.forEach( el => {
          if (el === values[i] || el === values[i-1]) return
          if (el === '-') expression += '-' 
          else if (el === '÷') expression += '/' 
          else if (el === '×') expression += '*' 
          else if (el === '+') expression += '+' 
          else expression += el
        })
        value = eval(expression).toFixed(2)
        if (value.indexOf('.') > 0) value = parseFloat(value)
        
        values[i]= eval(value*values[i]/100)
        setEval(values[i])
        return
      }  
    }
    if (data === 'minus') {
      i = values.length-1 > 0 ? values.length-1 : 0 
      if (value !== '') {
        values = [value]
        value = ''
        i = values.length-1 > 0 ? values.length-1 : 0 
      }
      if (values[0] === '') values[0] = '0'
      if (values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+' ) values[i] = '-'
      else values.push('-')
      setEval('-')
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
    }
    if (data === 'plus') {
      i = values.length-1 > 0 ? values.length-1 : 0 
      if (value !== '') {
        values = [value]
        value = ''
        i = values.length-1 > 0 ? values.length-1 : 0 
      }
      if (values[0] === '') values[0] = '0'
      if (values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+' ) values[i] = '+'
      else values.push('+')
      setEval('+')
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
    }
    if (data === 'split') {
      i = values.length-1 > 0 ? values.length-1 : 0 
      if (value !== '') {
        values = [value]
        value = ''
        i = values.length-1 > 0 ? values.length-1 : 0 
      }
      if (values[0] === '') values[0] = '0'
      if (values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+' ) values[i] = '÷'
      else values.push('÷')
      setEval('÷')
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
    }
    if (data === 'multy') {
      i = values.length-1 > 0 ? values.length-1 : 0 
      if (value !== '') {
        values = [value]
        value = ''
        i = values.length-1 > 0 ? values.length-1 : 0 
      }
      if (values[0] === '') values[0] = '0'
      if (values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+' ) values[i] = '×'
      else values.push('×')
      setEval('×')
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
    }
    if (data === 'invert') {
      i = values.length-1 > 0 ? values.length-1 : 0 
      if ((values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+') && values.length !== 1) return
      if (values[i].indexOf('-') === 0) {
        values[i] = values[i].slice(1, values[i].length)
      } else values[i] = '-' + values[i]
      setEval(values[i])
      if (values[0]==='') setEval(0)
      i = values.length-1 > 0 ? values.length-1 : 0 
      
      let old = ''
      values.forEach((el, id) => {
        if (id === values.length-1) return
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) return
        old += el + ' '
      })
      setOld(old)
      if (value !== '') {
        evalHandler(i, t)
      }
    }
}

const numberHandler = (i, t, data) => {
  i = values.length-1 > 0 ? values.length-1 : 0 
  if (value !== '') {
    value = ''
    values = ['']
    i=0
    setOld('')
  }
  if ((values[i] === '-' ||
        values[i] === '÷' ||
        values[i] === '×' ||
        values[i] === '+') && values.length !== 1 ) {
      let old = ''
      values.forEach((el, id) => {
        if ((el === '-' || el === '÷' ||
            el === '×' || el === '+') && id === i ) old += el + ' '
        if (id !== i) old += el + ' '
      })
      setOld(old)
      if (data === 'comma') values.push('0.')
      else values.push(data)
      setEval(values[i+1])
    } else {
      if (data === 'comma') {
        if (values[i].indexOf('.')>=0) return
        if (values[i].length === 0) values[i].length < 15? values[i] += '0.' : ''
        else values[i].length < 15? values[i] += '.' : ''
      } else if (data === '0') {
        if (values[i] === '0')''
        else values[i].length < 15? values[i] += 0 : ''
      } else if ( values[i].length < 15) {
        values[i] === '0'? values[i] = data: values[i] += data 
      }
      setEval(values[i])
    }

    if (!t) return
    t.classList.add('anim-btn')
    setTimeout(()=> t.classList.remove('anim-btn'), 400)
}

const clickHandler = e => {
  let t = e.target
  const isActions = t.classList.contains('btn-actions')
  const isEval = t.classList.contains('btn-evaluate')
  const data = t.dataset.id
  if (!data) return

  let i = values.length-1 > 0 ? values.length-1 : 0 
  
  if (data !== ',' && !isActions && !isEval) numberHandler(i, t, data)
  if (isActions) actionHandler(i, t, data)
  if (isEval) evalHandler(i, t)

  // console.clear()
  // console.log(values)
}


//      --------  events

main.addEventListener('mousedown', clickHandler)
main.addEventListener('touchstart', e => {
  main.removeEventListener('mousedown', clickHandler)
  clickHandler(e)
})

theme.addEventListener('click', () => {
  document.querySelector('.calc').classList.toggle('calc-white')
  localStorage.setItem('theme', document.querySelector('.calc').classList)
})
document.addEventListener('keydown', e => {
  let data = ''
  let isActions = ''
  let isEval = ''

  if (e.code === 'Numpad0' ||
      e.code === 'Digit0') data = '0'
  if (e.code === 'Numpad1' ||
      e.code === 'Digit1') data = '1'
  if (e.code === 'Numpad2' ||
      e.code === 'Digit2') data = '2'
  if (e.code === 'Numpad3' ||
      e.code === 'Digit3') data = '3'
  if (e.code === 'Numpad4' ||
      e.code === 'Digit4') data = '4'
  if (e.code === 'Numpad5' ||
      e.code === 'Digit5') data = '5'
  if (e.code === 'Numpad6' ||
      e.code === 'Digit6') data = '6'
  if (e.code === 'Numpad7' ||
      e.code === 'Digit7') data = '7'
  if (e.code === 'Numpad8' ||
      e.code === 'Digit8') data = '8'
  if (e.code === 'Numpad9' ||
      e.code === 'Digit9') data = '9'
  if (e.code === 'NumpadDecimal' ||
      e.code === 'Comma' ||
      e.code === 'Period') data = 'comma'
  if (e.code === 'NumpadDivide') {
    data = 'split'
    isActions = true
  }
  if (e.code === 'NumpadMultiply') {
    data = 'multy'
    isActions = true
  }
  if (e.code === 'NumpadSubtract' || 
      e.code === 'Minus') {
    data = 'minus'
    isActions = true
  }
  if (e.code === 'NumpadAdd' || 
      e.code === 'Equal') {
    data = 'plus'
    isActions = true
  }
  if (e.code === 'Backspace') {
    data = 'del'
    isActions = true
  }
  if (e.code === 'NumpadEnter' || 
      e.code === 'Enter') {
    data = 'eval'
    isEval = true
  }


  if (!data) return

  let i = values.length-1 > 0 ? values.length-1 : 0 
  
  if (data !== ',' && !isActions && !isEval) numberHandler(i, '', data)
  if (isActions) actionHandler(i, '', data)
  if (isEval) evalHandler(i, '')
})


// ---------- click

let startY = null
let posY = null 
let distance = null

const moveEndHandler = () => {
  if (distance > 200) {
    main.classList.add('hidden')
    main.style.marginBottom = '-365px'
    header.style.height = '520px'
    distance = null
    posY = null 
    startY = null
    return
  }
  if (distance < -200) {
    main.classList.remove('hidden')
    main.style.marginBottom = '0'
    header.style.height = '153px'
    distance = null
    posY = null 
    startY = null
    return
  } else {
    if (!main.classList.contains('hidden')) {
      main.style.marginBottom = '0'
      header.style.height = '153px'
      distance = null
      posY = null 
      startY = null
    } else {
      main.style.marginBottom = '-365px'
      header.style.height = '520px'
      distance = null
      posY = null 
      startY = null
    }
  }
}

const headerMoveHandler = e => {
  if (startY === null) return
  posY = e.screenY
  distance = posY-startY
  if (!main.classList.contains('hidden')) {
    main.style.marginBottom = -distance+'px'
  } else {
    main.style.marginBottom = -distance-365+'px'
  }
}

header.addEventListener('mousedown', e => {
  startY = e.screenY
  header.style.transition = '0s'
  main.style.transition = '0s'
  header.addEventListener('mousemove', headerMoveHandler)
})

document.addEventListener('mouseup', e => {
  header.style.transition = ''
  main.style.transition = ''
  
  header.removeEventListener('mousemove', headerMoveHandler)
  moveEndHandler()
})


// -----------> touch

const headerTouchHandler = e => {
  if (startY === null) return
  posY = e.touches[0].screenY
  distance = posY-startY
  if (!main.classList.contains('hidden')) {
    main.style.marginBottom = -distance+'px'
  } else {
    main.style.marginBottom = -distance-365+'px'
  }
}

header.addEventListener('touchstart', e => {
  startY = e.touches[0].screenY
  header.style.transition = '0s'
  main.style.transition = '0s'
  header.addEventListener('touchmove', headerTouchHandler)
})

document.addEventListener('touchend', () => {
  header.style.transition = ''
  main.style.transition = ''
  
  header.removeEventListener('touchmove', headerTouchHandler)
  moveEndHandler()
})