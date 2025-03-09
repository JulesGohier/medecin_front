
export const parseurJSON = (id: string) => {
    const idStorage = localStorage.getItem(id);
    const result = JSON.parse(idStorage);

    return result;
}