/* global $*/
(function () {
  'use strict';

  const contactsTable = $('#contactsTable tbody');

  let contacts = [];
  const firstInput = $('#first');
  const lastInput = $('#last');
  const emailInput = $('#email');
  const phoneInput = $('#phone');
  const addContactForm = $('#addContactForm');

  $('#addContact').click(() => {
    addContactForm.slideDown('fast');
  });

  addContactForm.on('submit', e => {
    e.preventDefault();

    empty();

    addContact(firstInput.val(), lastInput.val(), emailInput.val(), phoneInput.val());

    hideForm();
  });

  function hideForm() {
    addContactForm.trigger('reset');
    addContactForm.slideUp('slow');
  }
  $('#cancel').click(hideForm);


  /////////  homework 75 /////////

  const loadContacts = $('#loadContacts');
  loadContacts.click(load);

  function load() {
    fetch('contacts.json')
      .then(r => {
        if (r.ok) {
          empty();
          return r.json();
        } else {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
      })
      .then(data => {

        data.forEach(contact => {
          addContact(contact);
        });

      })
      .catch(error => {
        console.error(`Failed to load file: Error: ${error.message}`);
      });
  }

  function empty() {
    if (!contacts.length) {
      contactsTable.empty();
    }
  }

  function addContact(firstAll, last, email, phone) {
    let newContact = {};
    if (arguments.length === 4) {
      newContact = {
        first: firstAll,
        last: last,
        email: email,
        phone: phone
      };
    }
    else {
      newContact = {
        first: firstAll.first,
        last: firstAll.last,
        email: firstAll.email,
        phone: firstAll.phone
      };
    }


    contacts.push(newContact);

    const row = $(`
            <tr>
              <td>${newContact.first}</td>
              <td>${newContact.last}</td>
              <td>${newContact.email}</td>
              <td>${newContact.phone}</td>
              <td><button>delete</button></td>
            </tr>`)
      .appendTo(contactsTable);

    const button = row.find('button');
    button.click(() => {
      row.remove();
      contacts = contacts.filter(c => c !== newContact);

      if (!contacts.length) {
        contactsTable.html('<td colspan="5">no contacts loaded</td>');
      }
    });
  }
})();