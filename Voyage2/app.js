// date
document.querySelector('#date').innerHTML = new Date().getFullYear()

// navbar
const open = document.querySelector('#navbar')

document.querySelector('#nav-btn').addEventListener('click', () => {
  open.classList.add('showNav')
})
document.querySelector('#nav-close').addEventListener('click', () => {
  open.classList.remove('showNav')
})

// slider
const slides = document.querySelectorAll('.offer__slide'),
  prev = document.querySelector('.offer__slider-prev'),
  next = document.querySelector('.offer__slider-next'),
  total = document.querySelector('#total'),
  current = document.querySelector('#current')

let slideIndex = 1
showSlides(slideIndex)

function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }

  slides.forEach((item) => (item.style.display = 'none'))

  slides[slideIndex - 1].style.display = 'block'

  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`
  } else {
    total.textContent = slideIndex
  }
}

function plusSlides(n) {
  showSlides((slideIndex += n))
}
prev.addEventListener('click', () => {
  plusSlides(-1)
})
next.addEventListener('click', () => {
  plusSlides(1)
})

// modal
const modalTrigger = document.querySelector('.btn-connect'),
  modal = document.querySelector('.modal'),
  modalInput = document.querySelector('.modal__input');

function openModal() {
  modal.classList.add('show')
  modal.classList.remove('hide')
  document.body.style.overflow = 'hidden'
}

modalTrigger.addEventListener('click', openModal)

function closeModal() {
  modal.classList.add('hide')
  modal.classList.remove('show')
  document.body.style.overflow = ''

  clearInterval(modalTimerId)
}

modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal__close')) {
    closeModal()
  }
})
document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && modal.classList.contains('show')) {
    closeModal()
  }
})

  const modalTimerId = setTimeout(openModal, 5000)

function showModalByScroll() {
  if (
    window.pageYOffset + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal()
    window.removeEventListener('scroll', showModalByScroll)
  }
}
  window.addEventListener('scroll', showModalByScroll)

function showThanksModal(message) {
  const prevModalDialog = document.querySelector('.modal__dialog')

  prevModalDialog.classList.add('hide')
  openModal()

  const thanksModal = document.createElement('div')
  thanksModal.classList.add('modal__dialog')
  thanksModal.innerHTML = `
			<div class="modal__content">
				<div class="modal__close" data-close>×</div>
				<div class="modal__title">${message}</p></div>
			</div>
			`

  document.querySelector('.modal').append(thanksModal)
  setTimeout(() => {
    thanksModal.remove()
    prevModalDialog.classList.add('show')
    prevModalDialog.classList.remove('hide')
    closeModal()
  }, 4000)
}

const forms = document.querySelector('.form-modal')
const message = {
  success: 'Thank you, we will reach you soon',
  failure: 'Something was wronge',
}

function bindPostData(item) {
  item.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(item)
    const object = {}
    formData.forEach(function (value, key) {
      object[key] = value
      console.log(value)
    })
    showThanksModal(message.success)
  })
}
bindPostData(forms)

// timer
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const giveaway = document.querySelector('.giveaway'),
  deadline = document.querySelector('.deadline'),
  items = document.querySelectorAll('.deadline-format h4')

let futureDate = new Date(2021, 12, 31, 12, 00, 00)
const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()
const date = futureDate.getDate()

let month = futureDate.getMonth()
month = months[month]
const weekday = weekdays[futureDate.getDay()]

giveaway.textContent = `Till ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}0am remain ... `

const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime()

  const t = futureTime - today

  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinutes = 60 * 1000

  let days = Math.floor(t / oneDay)
  let hours = Math.floor((t % oneDay) / oneHour)
  let minutes = Math.floor((t % oneHour) / oneMinutes)
  let seconds = Math.floor((t % oneMinutes) / 1000)

  const value = [days, hours, minutes, seconds]

  function format(item) {
    if (item < 10) {
      return (item = `0${item}`)
    }
    return item
  }
  items.forEach((item, idx) => {
    item.innerHTML = format(value[idx])
  })
  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="expired">if you can read this that's mean time is gone and you are getting enjoyable time </h4>`
  }
}
let countdown = setInterval(getRemainingTime, 1000)
getRemainingTime()

// gift

const mainGift = document.querySelector('.popup-gift'),
  giftClose = document.querySelector('.popup-close'),
  giftImg = document.querySelector('.img-gift')

giftImg.addEventListener('click', () => {
  mainGift.style.display = 'block'
  giftImg.remove()
  document.body.style.overflow = 'hidden'
})
giftClose.addEventListener('click', () => {
  mainGift.style.display = 'none'
  document.body.style.overflow = ''
})
