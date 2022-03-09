/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signUp } from './auth';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const forgotForm = document.querySelector('.form--forgot');
const signUpForm = document.querySelector('.form--sign-up');
const logOutBtn = document.querySelectorAll('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const menu = document.querySelector('.menu');
const closebtn = document.querySelector('.closebtn');
const showMenu = document.querySelector('.show-menu');
const hideMenu = document.querySelector('.hide-menu');

const rootDiv = document.querySelector('.root-div');
const loader = document.querySelector('.pre-loader');


// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) {
  logOutBtn.forEach(e => e.addEventListener('click', logout));
}

if (signUpForm)
  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signUp(name, email, password, passwordConfirm);
  });

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);

if(menu) {
  menu.addEventListener('click', () => {
    document.getElementById("mySidenav").style.width = "250px";
  })
}

if(closebtn) {
  closebtn.addEventListener('click', () => {
    document.getElementById("mySidenav").style.width = "0";
  })
}

if (showMenu) {
  showMenu.addEventListener('click', () => {
    document.querySelector(".user-view__menu").style.display = "block";
    document.querySelector(".show-menu").style.display = "none";
    document.querySelector(".hide-menu").style.display = "block";
  })
}

if (hideMenu) {
  hideMenu.addEventListener('click', () => {
    document.querySelector(".user-view__menu").style.display = "none";
    document.querySelector(".show-menu").style.display = "block";
    document.querySelector(".hide-menu").style.display = "none";
  })
}

document.addEventListener('DOMContentLoaded', (event) => {

  rootDiv.style.display = "none";
  loader.style.display = "flex";
});

window.addEventListener('load', function() {

  rootDiv.style.display = "block";
  loader.style.display = "none";
}, false);

