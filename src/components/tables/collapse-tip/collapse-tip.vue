<template>
    <Collapse class="tip-collapse" simple>
        <Panel class="tip-panel" hideArrow name="1">
            <p class="tip-title"><Icon :size="18" type="ios-outlet-outline" />{{text}}</p>
            <p slot="content">{{content_text}}</p>
        </Panel>
    </Collapse>
</template>

<script>
    export default {
        name: "collapse-tip",
        components: {},
        props: {
            text: String,
            content_text: String
        },
    }
</script>

<style lang="less">
    .tip-collapse {
        border: 0px;
        /*background: skyblue;*/
        .tip-panel {
            background-color:rgba(135,206,235,0.2);
            /*background-color: skyblue;*/
            margin: 0px;
            border-radius: 0.3rem;
            .ivu-collapse-content {
                border-radius: 0.3rem;
                margin: 0px;
                background-color:rgba(135,206,235,0);
            }
        }
    }

</style>