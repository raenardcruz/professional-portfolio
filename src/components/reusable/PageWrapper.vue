<template>
    <div class="page-wrapper">
        <slot />
    </div>
</template>

<style scoped>
    .page-wrapper {
        width: 100%;
        min-height: calc(100vh - 60px);
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>