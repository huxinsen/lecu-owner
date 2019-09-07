import Vue from 'vue'
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  Form,
  FormItem,
  Icon,
  Row,
  Col,
  Upload,
  Notification,
} from 'element-ui'

Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)

Vue.prototype.$notify = Notification
