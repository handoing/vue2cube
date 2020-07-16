
<div class="box">
  <p>{{ message }}</p>
  <input c-model="{{message}}">
  <button on-click="{{this.reverseMessage($event)}}">反转消息</button>
  <button on-click="{{this.reverseMessage($event)}}">反转消息</button>
</div>
