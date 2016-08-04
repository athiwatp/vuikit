<template>
  <vk-docs-layout-page>
    <div class="uk-block">
      <h2>Table</h2>
      <hr class="uk-article-divider">
      <!-- DEMO -->
      <vk-table ref="table"
        :fields="[{
          name: 'id',
          sortBy: true
        }, {
          name: 'name',
          sortBy: true
        }, {
          name: 'desc',
          header: 'Description',
          headerClass: 'uk-text-right',
          cellClass: 'uk-text-right'
        }]"
        :rows="rows"
        :striped="props.striped.demo.value"
        :condensed="props.condensed.demo.value"
        :hover="props.hover.demo.value"
        :sort-order="sortOrder"
        @sort="
          events.sort.emited = true,
          sortRows(arguments[0])
        ">
        {{ $refs.table.$renderingRow[ $refs.table.$renderingField.name ] }}
      </vk-table>
      <!-- DESC -->
      <div class="uk-margin-large">
        The <code>vk-table</code> component renders a table based on the provided fields
        definition and data.
      </div>
      <!-- TABS -->
      <vk-tabs>
        <vk-tab label="Props">
          <vk-docs-props
            :props="props"
            @change="props[arguments[0]].demo.value = arguments[1]">
          </vk-docs-props>
        </vk-tab>
        <vk-tab label="Slots">
          <vk-docs-slots :slots="slots"></vk-docs-slots>
        </vk-tab>
        <vk-tab label="Events">
          <vk-docs-events :events="events"></vk-docs-events>
        </vk-tab>
        <vk-tab label="Example">
          <vk-docs-code>{{ code }}</vk-docs-code>
        </vk-tab>
      </vk-tabs>
    </div>
  </vk-docs-layout-page>
</template>

<script>
import { orderBy } from 'lodash'
import Component from '../lib/Table'
import mixin from './_mixin'
import { mergeProps } from './helper'

export default {
  name: 'PageTable',
  mixins: [mixin],
  data: () => ({
    props: mergeProps(Component.props, props),
    slots,
    events,
    example,
    rawRows: [
      { name: 'Item B', id: 1, desc: 'Description' },
      { name: 'Item A', id: 2, desc: 'Description' }
    ],
    sortOrder: {
      name: 'desc'
    }
  }),
  computed: {
    rows () {
      const by = Object.keys(this.sortOrder)[0]
      const dir = this.sortOrder[by]
      return orderBy(this.rawRows, by, dir)
    }
  },
  methods: {
    sortRows (sortOrder) {
      this.sortOrder = sortOrder
    }
  }
}

const props = {
  fields: {
    description: `A collection of <code>String</code>, <code>Objects</code> or mix of both
      defining the fields. Simple field definition will be converted to
      <code>Object</code>.`
  },
  rows: {
    description: 'A collection of <code>Objects</code> representing the rows data.'
  },
  sortOrder: {
    description: `Object defining the current order being the <code>key</code> the
      field being sorted by and the <code>value</code> the direction, <code>asc</code>
      or <code>desc</code>.`
  },
  condensed: {
    description: 'Whether to display the rows compacted.',
    demo: {
      value: true
    }
  },
  striped: {
    description: 'Whether to display the rows with zebra-striping style.',
    demo: {
      value: false
    }
  },
  hover: {
    description: 'Whether to display a hover state on rows.',
    demo: {
      value: false
    }
  }
}

const slots = {
  default: {
    description: `The template for each field rendering. The field and row data being
      currently rendered can be accessed at the component <code>$renderingRow</code> and
      <code>$renderingField</code> respectively. Use with combination of <code>ref</code>,
      eg. <code>$refs.calendar.$renderingRow</code>.`
  }
}

const events = {
  sort: {
    description: `Emited when a sortable field header has been clicked passing
      as arguments the field data.`,
    emited: false
  }
}

const example =
`<vk-table ref="table" {attrs}
  :fields="[
    'id',
    'name',
    {
      name: 'desc',
      header: 'Description',
      headerClass: 'uk-text-right',
      cellClass: 'uk-text-right'
    }
  ]"
  :rows="[
    { name: 'Item 1', id: 1, desc: 'Description' },
    { name: 'Item 2', id: 2, desc: 'Description' }
  ]">
  {{ $refs.table.$renderingRow[ $refs.table.$renderingField.name ] }}
</vk-table>`
</script>