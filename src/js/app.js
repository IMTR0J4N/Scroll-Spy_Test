import '../css/style.css';
import '../css/reset.css';

const ratio = .6
const spies = document.querySelectorAll('[data-spy]')

let observer = null

const activate = (elem) => {
  const id = elem.getAttribute('id')
  const anchor = document.querySelector(`a[href="#${id}"]`)
  if (anchor === null) {
    return null
  }
  anchor.parentElement.parentElement
    .querySelectorAll('.active')
    .forEach(node => console.log(node))
  anchor.classList.add('active')
}

const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            activate(entry.target)
        }
    })
  }
  
const observe = (elems) => {
    if(observer !== null) {
        elems.forEach(elem => observer.unobserve(elem))
    }

    const y = Math.round(window.innerHeight * ratio)
    observer = new IntersectionObserver(callback, {
        rootMargin: `-${window.innerHeight - y - 1}px 0px -${y}px 0px`
    })
    spies.forEach((spy) => {
        observer.observe(spy)
    })
} 
  
  if(spies.length > 0) {
    observe(spies)
    window.addEventListener('resize',() => {
        observe(spies)
    })
  }