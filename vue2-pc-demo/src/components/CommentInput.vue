<template>
  <div class="comment-input">
    <div class="comment-input-content">
      <div class="edit placeholder" v-show="!content">请输入...</div>
      <div 
        ref="input"
        class="edit" 
        contenteditable 
        @input="onInput"
        @paste.prevent="onPaste"
        @keydown.ctrl.enter="onSubmit">
      </div>
    </div>
    <div class="comment-input-toolbar">
      <div class="el-dropdown-menu" v-show="showUsrs">
        <div
          class="el-dropdown-menu__item"
          :key="item"
          v-for="item in atUsrs"
          @click="onClickAtItem({ key: item })"
        >
          {{item}}
        </div>
      </div>
      <el-button type="text" @click="showAtPop">@</el-button>
      <el-button class="btn-submit" type="text" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {setSelection} from '@/assets/dom'
  
  export default {
    name: 'commentInput',
    data() {
      return {
        content: '',
        showUsrs: false,
        atUsrs: ['用户1', '用户2', '用户3']
      }
    },
    methods: {
      onInput(event) {
        const newContent = event.target.innerHTML
        const newArr = newContent.split('@')
        const oldArr = this.content.split('@')
        if (newArr.length - oldArr.length === 1) {
          this.isInputAt = true
          this.showAtPop()
        }
        this.content = newContent
      },
      // 复制，可以用于拦截复制内容
      onPaste(event) {
        let text = (event.clipboardData || window.clipboardData).getData('text')
        document.execCommand('insertHTML', false, text)
      },
      onSubmit() {
        const {input} = this.$refs
        let text = input.innerHTML
        // 收集 @ 项，顺便处理 at 文本内容
        const atEls = [...input.querySelectorAll('.at')]
        const usrs = atEls.map(el => {
          // 去掉@的内容
          text = text.replace(new RegExp(el.outerHTML + '(&nbsp;)?'), '')
          return {name: el.getAttribute('data-name')}
        })

        if (!text) {
          this.$message.warning('请输入内容')
          return
        }

        this.init()
        this.$emit('submit', {
          content: text,
          usrs
        })
      },
      showAtPop() {
        const selection = window.getSelection && window.getSelection()
        this.atPrevEl = selection && selection.focusNode && selection.focusNode.previousElementSibling
        this.atOffset = selection && selection.focusOffset
        if (!this.atOffset && this.atOffset !== 0) this.atOffset = null
        this.showUsrs = true
      },
      // 选择了@选项
      onClickAtItem({key}) {
        const { input } = this.$refs
        let data = [key]
        let html = input.innerHTML
        this.showUsrs = false

        const addhtml = data
          // 这里后面的 </span>&nbsp; 结尾是为了能让光标能正常定位到末尾，不然钉钉web应用会有兼容问题光标定位无效
          .map(item => `<span class="at" data-userId="${item}" data-name="${item}" onclick="return false;" contenteditable="false">@${item}</span>&nbsp;`)
          .join('')
        
        // 如果没有新增的内容就直接返回
        if (!addhtml) {
          this.isInputAt = false
          return
        }

        // 如果是输入 @ 弹出的选人，则清除之前最后一个位置的 @
        if (this.isInputAt) {
          // 如果前面存在有用户信息元素就直接获取 html 做处理
          if (this.atPrevEl) {
            const atPrevElHtml = this.atPrevEl.outerHTML + '' // 原字符串
            const atPrevElHtmlAndSpace = atPrevElHtml + '&nbsp;' // 原字符串，包含后面的空格
            const atPrevElHtmlRep = atPrevElHtml + '@' // 用于做替换用，需要移除@
            const atPrevElHtmlAndSpaceRep = atPrevElHtmlAndSpace + '@' // 用于做替换用，需要移除@
            const newHtml = atPrevElHtml + addhtml // 新插入字符串
            const newAndSpaceHtml = atPrevElHtmlAndSpace + addhtml // 新插入字符串

            if (html.match(atPrevElHtmlAndSpaceRep)) {
              html = html.replace(atPrevElHtmlAndSpaceRep, newAndSpaceHtml)
            } else if (html.match(atPrevElHtmlRep)) {
              html = html.replace(atPrevElHtmlRep, newHtml)
            } else {
              if (html[html.length - 1] === '@') html = html.slice(0, html.length - 1)
              html += addhtml
            }
          } else {
            if (html[html.length - 1] === '@') html = html.slice(0, html.length - 1)
            html += addhtml
          }
        } else {
          html += addhtml
        }

        this.content = input.innerHTML = html
        // 重新定位光标
        setSelection(input)
        this.isInputAt = false
      },
      init() {
        const {input} = this.$refs
        this.content = input.innerHTML = ''
      }
    }
  }
</script>

<style lang="scss">
  .comment-input {
    position: relative;
  }

  .comment-input-content {
    position: relative;
    border: 1px solid lightgray;
    border-radius: 4px;
    .edit {
      min-height: 60px;
      padding: 5px 10px;
      background: #fff;
      line-height: 20px;
      .at {
        color: blue;
      }
    }
    .placeholder {
      position: absolute;
      background: transparent;
      color: #c5c5c5;
      pointer-events: none;
    }
  }

  .comment-input-toolbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    .el-dropdown-menu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
  }
</style>