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
    //addContactForm.css('display', 'inline-block');
    //addContactForm.show();
    addContactForm.slideDown('fast');
  });

  function addContact(newContact) {
    if (!contacts.length) {
      contactsTable.empty();
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

    console.log(row);

    const button = row.find('button');
    button.click(() => {
      row.remove();
      contacts = contacts.filter(c => c !== newContact);

      if (!contacts.length) {
        contactsTable.html('<td colspan="5">no contacts loaded</td>');
      }
    });
  }

  addContactForm.on('submit', e => {
    e.preventDefault();

    const newContact = {
      first: firstInput.val(),
      last: lastInput.val(),
      email: emailInput.val(),
      phone: phoneInput.val()
    };

    addContact(newContact);

    hideForm();
  });

  function hideForm() {
    //addContactForm[0].reset();
    addContactForm.trigger('reset');
    //addContactForm.css('display', 'none');
    //addContactForm.hide();
    addContactForm.slideUp('slow');
  }

  $('#cancel').click(hideForm);

  $('#load').click(async () => {
    try {
      const r = await fetch('http://localhost:3000/contacts-api');
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const loadedContacts = await r.json();
      loadedContacts.forEach(contact => { if (!contact.success_status) addContact(contact) });
    }
    catch (e) {
      console.error(e);
    }
  });
}());
