import '../css/style.css';
import '../css/reset.css';

const spies = document.querySelectorAll('[data-spy]')

let observer = null

const activate = (elem) => {
  const id = elem.getAttribute('id')
  const anchor = document.querySelector(`li > a[href="#${id}"]`)
  console.log(anchor);
  if (anchor === null) {
    return null
  }
  const anchorsActive = document.querySelectorAll(`li > a.active`)
    .forEach(node => node.classList.remove('active'))
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
    observer = new IntersectionObserver(callback, {
        rootMargin: `-50% 0px`
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