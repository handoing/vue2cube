
<div class="box">
  <Text title="{{ message }}"></Text>
  <input c-model="{{message}}">
  <span on-click="{{this.reverseMessage($event)}}"><Button text="反转消息"></Button></span>
  <span on-click="{{this.reverseMessage($event)}}"><Button text="反转消息"></Button></span>
</div>
