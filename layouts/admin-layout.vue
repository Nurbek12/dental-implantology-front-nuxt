<template>
    <div class="flex">
        <app-nav-drawer />
        <main class="flex-1 min-h-[100vh] bg-gray-100 pl-[57px] md:pl-0 overflow-auto">
            <slot />
        </main>
    </div>
</template>