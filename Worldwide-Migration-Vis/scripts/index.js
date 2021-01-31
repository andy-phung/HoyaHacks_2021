import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true, 
    multiplier:2,
});
const horizontal = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-direction]'),
    smooth: true, 
    getDirection:horizontal, 
    direction:horizontal, 
    gestureDirection:horizontal
});
