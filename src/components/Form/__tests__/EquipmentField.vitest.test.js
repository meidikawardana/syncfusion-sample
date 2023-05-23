import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { flushPromises, mount } from '@vue/test-utils'
import EquipmentField from 'src/components/Form/EquipmentField.vue'
import { describe, expect, it, vi } from 'vitest'
import { QSelect } from 'quasar'
import Equipment from 'src/modules/Config/models/Equipment/Equipment'

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

const options = [
  'test1',
  'test2'
]

installQuasarPlugin()
let wrapper = null

describe('Equipment field unit test', async () => {
  beforeEach(() => {
    wrapper = mount(EquipmentField, {
      components: {
        QSelect
      },
      global: {
        mocks: {
          Equipment
        },
      },
    })
  })
  it('should mount component', () => {
    expect(wrapper.find('input').attributes('aria-label')).toBe('Equipment')
  })
  it('should have a list of equipment code after we fill the input, and the list\'s first row has text in it', async () => {
    // vi.useFakeTimers()

    // console.log('--', wrapper)
    // wrapper.find('input').trigger('click')
    await wrapper.find('input').setValue('1234')

    // console.log('--', wrapper.findComponent(QSelect))
    expect(wrapper.findComponent(QSelect).exists()).toBe(true)
    // wrapper.findComponent(QSelect).vm.showPopup()
    console.log('--2', wrapper.vm.loading)

    // console.log('--1', wrapper.vm.options)

    // const controlId = wrapper.find('input').attributes('aria-controls')

    await flushPromises()

    wrapper.vm.options = options

    sleep(2000)

    console.log('--3', wrapper.vm.options)

    // vi.runAllTimers()

    // // console.log('--', controlId)
    console.log('--2', document.querySelectorAll('[role=option]').length)

    // // await waitFor(() => {
    // // expect(document.getElementById(controlId).querySelectorAll('[role=option]').length).toBeGreaterThanOrEqual(1)
    // // })

    // // expect(document.getElementById(controlId).querySelector('[role=option]:first-child').querySelector('.q-item__label').textContent).not.empty
  })

  afterEach(() => {
    vi.useRealTimers()
  })
})
