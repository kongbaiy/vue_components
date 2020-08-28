<template>
    <div class="form-page">
        <div class="c-header-t1">
            <p class="c-header-title">
                {{form.title}}
            </p>
        </div>
        <custom-form :model="form" :rules="rules" :container-el="formContainerEl" ref="form">
            <div class="form-box">
                <custom-form-item required label="姓名" prop="nikename">
                    <custom-input
                        placeholder="请输入姓名"
                        maxlength="20"
                        v-model="form.nikename"
                    />
                </custom-form-item>

                <custom-form-item required label="手机" prop="tel">
                    <custom-input
                        type="number"
                        placeholder="请输入手机号"
                        maxlength="11"
                        v-model="form.tel"
                    />
                </custom-form-item>

                <custom-form-item required label="角色" prop="role">
                    <custom-select placeholder="请选择角色" v-model="form.role">
                        <custom-select-option v-for="(item, index) in roleList" :key="index" :label="item" :value="item"></custom-select-option>
                    </custom-select>
                </custom-form-item>

                <custom-form-item required label="单位" prop="company">
                    <custom-input
                        placeholder="请输入单位"
                        maxlength="35"
                        v-model="form.company"
                    />
                </custom-form-item>

                <custom-form-item required label="职位" prop="position">
                    <custom-input
                        placeholder="请输入职位"
                        maxlength="20"
                        v-model="form.position"
                    />
                </custom-form-item>

                <custom-form-item required label="微信" prop="wechat">
                    <custom-input
                        placeholder="请输入微信"
                        maxlength="20"
                        v-model="form.wechat"
                    />
                </custom-form-item>

                <custom-form-item required label="邮箱" prop="email">
                    <custom-input
                        placeholder="请输入邮箱"
                        maxlength="20"
                        v-model="form.email"
                    />
                </custom-form-item>

                <div>
                    <custom-form-item label="参会车牌号" prop="ChCph">
                        <custom-input
                            placeholder="请输入参会车牌号"
                            maxlength="20"
                            v-model="form.ChCph"
                        />
                    </custom-form-item>

                    <custom-form-item required label="参观实验室" prop="visitLab">
                        <custom-select
                            placeholder="请选择参观实验室"
                            v-model="form.visitLab"
                        >
                            <custom-select-option
                                label="实验室1"
                                value="实验室1"
                            ></custom-select-option>
                            <custom-select-option
                                label="实验室2"
                                value="实验室2"
                            ></custom-select-option>
                            <custom-select-option
                                label="实验室3"
                                value="实验室3"
                            ></custom-select-option>
                            <custom-select-option
                                label="不参观"
                                value="不参观"
                            ></custom-select-option>
                        </custom-select>
                    </custom-form-item>

                    <custom-form-item
                        required
                        label="是否提供技术需求"
                        prop="support"
                    >
                        <custom-radio v-model="form.support">
                            <custom-radio-item label="是" value="2" />
                            <custom-radio-item label="否" value="1" />
                        </custom-radio>
                    </custom-form-item>

                    <custom-form-item
                        :required="form.support == 2"
                        label="企业名称"
                        prop="enterprise"
                    >
                        <custom-input
                            placeholder="请输入企业名称"
                            maxlength="40"
                            v-model="form.enterprise"
                        />
                    </custom-form-item>

                    <custom-form-item :required="form.support == 2" label="所属行业" prop="industry">
                        <custom-select
                            placeholder="请选择所属行业"
                            v-model="form.industry"
                        >
                            <custom-select-option
                                label="农业"
                                value="农业"
                            ></custom-select-option>
                            <custom-select-option
                                label="农业"
                                value="农业"
                            ></custom-select-option>
                            <custom-select-option
                                label="无"
                                value="无"
                            ></custom-select-option>
                        </custom-select>
                    </custom-form-item>

                    <custom-form-item
                        :required="form.support == 2"
                        label="企业基本情况"
                        prop="situation"
                    >
                        <custom-input
                            placeholder="请输入企业基本情况"
                            maxlength="100"
                            v-model="form.situation"
                        />
                    </custom-form-item>

                    <custom-form-item
                        :required="form.support == 2"
                        label="成果需求内容及重要指标描述"
                        prop="indexDescribe"
                    >
                        <custom-input
                            placeholder="请输入成果需求内容及重要指标描述"
                            maxlength="100"
                            v-model="form.indexDescribe"
                        />
                    </custom-form-item>

                    <custom-form-item
                        :required="form.support == 2"
                        label="合作方式"
                        prop="cooperation"
                    >
                        <custom-input
                            placeholder="请输入合作方式"
                            maxlength="35"
                            v-model="form.cooperation"
                        />
                    </custom-form-item>

                    <custom-form-item :required="form.support == 2" label="拟投入资金" prop="money">
                        <custom-input
                            placeholder="请输入拟投入资金"
                            maxlength="20"
                            v-model="form.money"
                        />
                    </custom-form-item>

                    <custom-form-item :required="form.support == 2" label="人才需求" prop="talentDemand">
                        <custom-input
                            placeholder="请输入人才需求"
                            maxlength="35"
                            v-model="form.talentDemand"
                        />
                    </custom-form-item>

                    <custom-form-item
                        :required="form.support == 2"
                        label="联系人(电话/邮箱）"
                        prop="contacts"
                    >
                        <custom-input
                            placeholder="请输入联系人(电话/邮箱)"
                            maxlength="20"
                            v-model="form.contacts"
                        />
                    </custom-form-item>
                </div>

                <div class="submit-btnBox" v-show="showSubmitBtn">
                    <div class="submit-btn" @click="formSubmit">确认提交</div>
                </div>
                <div class="submit-btn-blank" v-show="showSubmitBtn"></div>
            </div>
        </custom-form>
    </div>
</template>

<script>
import {
    form,
    formItem,
    input,
    select,
    selectOption,
    radio,
    radioItem
} from '@/app/components/form';

/**
 * 自定义组件方法没做函数校验
 * */
export default {
    components: {
        'custom-form': form,
        'custom-form-item': formItem,
        'custom-input': input,
        'custom-select': select,
        'custom-select-option': selectOption,
        'custom-radio': radio,
        'custom-radio-item': radioItem
    },

    data() {
        return {
            form: {},
            rules: {
                nikename(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入姓名'));
                },
                tel(val, callback) {
                    if (/^1[3456789]\d{9}$/.test(val)) callback();
                    else callback(new Error('请输入正确的手机号'));
                },
                role(val, callback) {
                    if (val) callback();
                    else callback(new Error('请选择角色'));
                },
                company(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入单位'));
                },
                position(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入职位'));
                },
                wechat(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入微信号'));
                },
                email(val, callback) {
                    if (/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(val)) callback();
                    else callback(new Error('请输入邮箱'));
                },
                // ChCph(val, callback) {
                //     if (val) callback();
                //     else callback(new Error('ChCph no value'));
                // },
                visitLab(val, callback) {
                    if (val) callback();
                    else callback(new Error('请选择参观实验室'));
                },
                support(val, callback) {
                    if (val) callback();
                    else callback(new Error('请选择是否提供技术需求'));
                },
                enterprise(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入企业名称'));
                },
                industry(val, callback) {
                    if (val) callback();
                    else callback(new Error('请选择所属行业'));
                },
                situation(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入企业基本情况'));
                },
                indexDescribe(val, callback) {
                    if (val) callback();
                    else callback(new Error('成果需求内容及重要指标描述'));
                },
                cooperation(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入合作方式'));
                },
                money(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入拟投入资金'));
                },
                talentDemand(val, callback) {
                    if (val) callback();
                    else callback(new Error('请输入人才需求'));
                },
                contacts(val, callback) {
                    let tel = /^1[3456789]\d{9}$/,
                        email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/;

                    if (tel.test(val) || email.test(val)) callback();
                    else if(val) callback(new Error('请输入正确的电话、邮箱'));
                    else callback(new Error('请输入联系人(电话/邮箱)'));
                }
            },
            roleList: ['A', 'B'],
            winDefaultHeight: document.documentElement.clientHeight,
            showSubmitBtn: true,
            formContainerEl: ''
        };
    },

    created() {

    },

    mounted() {
      window.onresize = this.onWindowResize;

      this.formContainerEl = document.querySelector('.demo .view');
    },

    methods: {
        formSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {

                }
            });
        },

        onWindowResize(e) {
            const WIN_SHOW_HEIGHT = document.documentElement.clientHeight;

            if (WIN_SHOW_HEIGHT < this.winDefaultHeight) {
                this.showSubmitBtn = false;
            } else {
                this.showSubmitBtn = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.form-page {
    background-color: #2859ef;
  }

.form-box {
    margin-top: -25px;
    padding: 25px 16px 20px 16px;
    background-color: #fff;
    border-radius: 16px 16px 0 0;
    .submit-btnBox {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9;
        box-sizing: border-box;
        padding: 16px 16px 20px 16px;
        width: 100%;
        background-color: #fff;
        .submit-btn {
          background-color: rgba(40, 89, 239, 1);
          height: 46px;
          border-radius: 8px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          text-align: center;
          line-height: 46px;
          color: rgba(255, 255, 255, 1);
        }
    }
    .submit-btn-blank {
        height: 68px;
    }
}
</style>
