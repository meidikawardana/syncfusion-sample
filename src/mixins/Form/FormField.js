export default {
  data () {
    return {
      isReadOnly: false
    }
  },
  filters: {
    formatDataCy: function (val) {
      return val.replace(/\s/g, '_').replace('#', '').replace('&', '').replace('(', '').replace(')', '').replace('/', '_')
    }
  },
  methods: {
    setReadOnly: function (args) {
      if (args) this.isReadOnly = true
    }
  },
  created () {
    // console.log(this.readonly)
    this.setReadOnly(this.readonly)
  }
}
