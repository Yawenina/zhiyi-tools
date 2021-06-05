
const create = require('../src/create')

describe('Create', () => {
  let spy: any
  beforeEach(() => {
    spy = jest.spyOn(console, 'error').mockImplementation()
  })
  it('name is valid', () => {
    create('@npm/thingy')
    expect(console.error).not.toBeCalled()
  })
  it('name is invalid', () => {
    create(' leading-space:and:weirdchars')
    expect(console.error).toBeCalledTimes(3)
  })

  afterEach(() => {
    spy.mockRestore()
  })
})