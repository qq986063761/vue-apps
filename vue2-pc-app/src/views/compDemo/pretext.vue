<template>
  <div class="pretext-demo">
    <p>
      <a
        href="https://www.npmjs.com/package/@chenglou/pretext"
        target="_blank"
        rel="noopener noreferrer">
        @chenglou/pretext
      </a>
      用 canvas 测量文本，<code>layout</code> 为纯算术换行，避免依赖 DOM 测量引发回流。
    </p>

    <div class="block">
      <p><strong>示例文案</strong>（含中英文与 emoji，与 README 类似）</p>
      <el-input
        v-model="sampleText"
        type="textarea"
        :rows="4"
        placeholder="输入多行文本"/>
    </div>

    <div class="block">
      <p><strong>布局参数</strong></p>
      <p>
        最大宽度 {{ maxWidth }}px
        <el-slider
          v-model="maxWidth"
          :min="120"
          :max="640"
          :show-tooltip="false"/>
      </p>
      <p>
        行高 {{ lineHeight }}px
        <el-slider
          v-model="lineHeight"
          :min="16"
          :max="40"
          :show-tooltip="false"/>
      </p>
    </div>

    <div class="block">
      <p><strong>prepare + layout（无 DOM 测量高度）</strong></p>
      <p v-if="measure">
        总行数：<code>{{ measure.lineCount }}</code>，
        总高度：<code>{{ measure.height.toFixed(2) }}</code> px
      </p>
    </div>

    <div class="block">
      <p><strong>prepareWithSegments + layoutWithLines（逐行排版预览）</strong></p>
      <p class="hint">字体与测量一致：<code>{{ fontCss }}</code></p>
      <div
        v-if="lines"
        class="line-preview"
        :style="previewBoxStyle">
        <div
          v-for="(line, i) in lines.lines"
          :key="i"
          class="line-preview__row"
          :style="lineRowStyle">
          {{ line.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    // 预处理文本（轻量结果，给 layout 用）
    prepare,
    // 预处理文本（包含 segments 细节，给 layoutWithLines 用）
    prepareWithSegments,
    // 计算总行数和总高度
    layout,
    // 计算总行数/总高度，并返回每一行内容
    layoutWithLines
  } from '@chenglou/pretext'

  const FONT = '16px Arial, sans-serif'

  export default {
    name: 'PretextDemo',
    data() {
      return {
        sampleText:
          'AGI 春天到了. بدأت الرحلة 🚀 Pretext measures paragraphs without DOM reflow.',
        maxWidth: 320,
        lineHeight: 24,
        prepared: null,
        preparedSeg: null
      }
    },
    computed: {
      fontCss() {
        return FONT
      },
      measure() {
        if (!this.prepared) {
          return null
        }
        return layout(this.prepared, this.maxWidth, this.lineHeight)
      },
      lines() {
        if (!this.preparedSeg) {
          return null
        }
        return layoutWithLines(
          this.preparedSeg,
          this.maxWidth,
          this.lineHeight
        )
      },
      previewBoxStyle() {
        return {
          width: `${this.maxWidth}px`,
          font: FONT,
          lineHeight: `${this.lineHeight}px`
        }
      },
      lineRowStyle() {
        return {
          minHeight: `${this.lineHeight}px`,
          lineHeight: `${this.lineHeight}px`
        }
      }
    },
    watch: {
      sampleText: {
        immediate: true,
        handler(val) {
          const text = val == null ? '' : String(val)
          this.prepared = prepare(text, FONT)
          this.preparedSeg = prepareWithSegments(text, FONT)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pretext-demo {
    code {
      padding: 0 4px;
      background: #f5f5f5;
      border-radius: 2px;
      font-size: 13px;
    }
  }

  .hint {
    color: #666;
    font-size: 13px;
    margin-top: 0;
  }

  .line-preview {
    border: 1px solid #ccc;
    padding: 8px;
    background: #fafafa;
    word-break: break-word;
  }

  .line-preview__row {
    white-space: pre-wrap;
  }
</style>
