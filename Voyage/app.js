const date = document.querySelector('#date')
date.innerHTML = new Date().getFullYear()

const navCenter = document.querySelector('.nav-center'),
  navHeader = document.querySelector('.nav-header'),
  scroolLinks = document.querySelectorAll('.scroll-link'),
  menuToggle = document.querySelector('.menuToggle'),
  navigator = document.querySelector('.navigator'),
  input = document.querySelectorAll('.send'),
  submitBtn = document.querySelector('.submit-btn')

window.addEventListener('scroll', function () {
  navCenter.classList.toggle('sticky', window.scrollY > 0)
})

submitBtn.addEventListener('click', () => {
  input.forEach((item) => (item.value = ''))
})

scroolLinks.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    const Rid = e.currentTarget.getAttribute('href').slice(1)
    const element = document.getElementById(Rid)

    const navHeight = navHeader.getBoundingClientRect().height
    let position = element.offsetTop - navHeight
    position = position - navHeight

    // for small display
    let containerHeight = navCenter.getBoundingClientRect().height
    if (containerHeight < 68) {
      position = position - containerHeight
    }
    navigator.classList.remove('active')
    menuToggle.classList.remove('active')

    window.scrollTo({
      left: 0,
      top: position,
    })
  })
})

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  navigator.classList.toggle('active')
})
