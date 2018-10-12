const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'jon',
      name: 'Jon Snow',
      email: 'js@winterfell.gov',
      avatarURL: config.origin + '/jon-snow.jpg'
    },
    {
      id: 'arya',
      name: 'Arya Stark',
      email: 'as@winterfell.gov',
      avatarURL: config.origin + '/arya-stark.jpg'
    },
    {
      id: 'tyrion',
      name: 'Tyrion Lannister',
      email: 'tl@casterlyrock.com',
      avatarURL: config.origin + '/tyrion-lannister.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
