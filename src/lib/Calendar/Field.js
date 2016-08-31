import { merge } from '../../helpers/util'

export default {
  functional: true,
  props: ['date'],
  render (h, { parent, props, data }) {
    let customComponent = false
    if (parent.fieldComponent) {
      customComponent = h(parent.fieldComponent, {
        props: merge({}, parent.fieldProps, props)
      })
    }
    return customComponent || (
      <a class={{
        'uk-datepicker-table-muted': !parent.isInCurrentMonth(props.date)
      }}>
        { props.date.format('D') }
      </a>
    )
  }
}