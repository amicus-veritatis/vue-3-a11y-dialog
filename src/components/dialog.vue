<template>
<dialog
:class="rootClasses"
:role="roleAttr"
ref="Dialog"
@click.self="close"
@close="emits('close', returnValue)"
@cancel="emits('cancel', returnValue)"
:aria-modal="modal"
:aria-labelledby="titleRefId"
:aria-label="label"
:aria-describedby="contentId"
>
<div :class="containerClasses">
<template v-if="alert">
<slot></slot>
</template>
<form method="dialog"
:class="formClasses" v-else>
<slot></slot>
</form>
</div>
</dialog>
</template>
<script setup lang="ts">
interface propTypes {
    label?: string,
    containerClass?: string,
    formClass?: string,
    classNames?: object | Function,
    rootClass?: string,
    alert?: boolean,
    modal?: boolean,
    titleId?: string,
    contentId?: string,
}
interface emitTypes {
    (event: 'cancel', returnValue: string): void,
    (event: 'close', returnValue: string): void
}
const {
    alert = false,
    modal = false,
    classNames = ()=>{
        return {
        container: 'dialog-container',
        root: 'dialog-root',
        form: 'dialog-form'
        }
    },
    containerClass,
    rootClass,
    formClass,
    label,
    titleId,
    contentId
} = defineProps<propTypes>()
const emits = defineEmits<emitTypes>()
const Dialog = $ref()
const close = (arg)=>{
    Dialog.close(arg)
}
const open = ()=>{
    if (modal) Dialog.showModal()
    else Dialog.show()
}
const returnValue = $computed(()=>{
    return Dialog?.returnValue
})
const titleRefId = $computed(()=>{
    if (label||!titleId) return null
    else {
        return titleId 
        // TO-DO: SELECTOR in case  of !label && ! titleId
    }
})
const roleAttr = $computed(()=>{
    return alert ? 'dialog' : 'alertdialog' 
})
const containerClasses = $computed(()=>{
    return [
        classNames().container,
        containerClass ?? null
    ]
})
const rootClasses = $computed(()=>{
    return [
        classNames().root,
        rootClass ?? null
    ]
})
const formClasses = $computed(()=>{
    return [
        classNames().form,
        formClass ?? null
    ]
})
defineExpose({
    close,
    open,
    returnValue
})
</script>