<template>
  <dialog
    :class="rootClasses"
    :role="roleAttr"
    ref="Dialog"
    @click.self="close"
    @close="emits('close', Dialog?.returnValue)"
    @cancel="emits('cancel', Dialog?.returnValue)"
    :aria-modal="modal"
    :aria-labelledby="titleRefId"
    :aria-label="label"
    :aria-describedby="contentId"
  >
    <div :class="containerClasses">
      <template v-if="alert">
        <slot></slot>
      </template>
      <form method="dialog" :class="formClasses" v-else>
        <slot></slot>
      </form>
    </div>
  </dialog>
</template>
<script setup lang="ts">
interface propTypes {
  label?: string;
  containerClass?: string;
  formClass?: string;
  classNames?: Function;
  rootClass?: string;
  alert?: boolean;
  modal?: boolean;
  titleId?: string;
  contentId?: string;
}
interface emitTypes {
  (event: "cancel", returnValue?: string): void;
  (event: "close", returnValue?: string): void;
}
const {
  alert = false,
  modal = false,
  classNames = () =>({
      container: "dialog-container",
      root: "dialog-root",
      form: "dialog-form",
  }),
  containerClass,
  rootClass,
  formClass,
  label,
  titleId,
  contentId,
} = defineProps<propTypes>();
const emits = defineEmits<emitTypes>();
const Dialog = $ref<HTMLDialogElement>();
const close = (arg) => {
  Dialog.close(arg);
};
const open = () => {
  if (modal) Dialog.showModal();
  else Dialog.show();
};
const headingSelector: Array<String> = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "[role='heading']",
];
const titleRefId = $computed(() => {
  if (label || titleId) return label || titleId;
  else {
    const title = Dialog?.querySelector(headingSelector.join(","));
    return title.id;
  }
});
const roleAttr = $computed(() => {
  return alert ? "dialog" : "alertdialog";
});
const containerClasses = $computed(() => {
  return [classNames().container, containerClass ?? undefined];
});
const rootClasses = $computed(() => {
  return [classNames().root, rootClass ?? undefined];
});
const formClasses = $computed(() => {
  return [classNames().form, formClass ?? undefined];
});
defineExpose({
  close,
  open,
});
</script>
