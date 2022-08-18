<template>
  <input type="text" name="filter" placeholder="Iščite po vzletiščih" />
</template>

<style scoped>
input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 10px;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5em;
}

@media (prefers-color-scheme: dark) {
  input {
    background-color: var(--vt-c-black);
    color: var(--vt-c-text-dark-2);
  }
}
</style>
