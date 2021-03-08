const { ObservableSet } = quantum;


export const initializeECS = () => {
    const systems = new ObservableSet();
    const entities = new ObservableSet();




    return { entities, systems };
};