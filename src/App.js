import { nanoid } from "nanoid";
import React, { useState, useRef, useEffect } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

//Criação de objeto.
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

//Estados ficam dentro da propriedade, pois toda vez que renderiza, altera eles.
function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const listHeadingRef = useRef(null);


  //Inserir
  function addTask(name) {
    if(name === ""){
       alert("Por favor, insira uma tarefa.");
     }else{
       const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
       setTasks([...tasks, newTask]);
     }
  }
 
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
  //Altera estado da checkbox
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // se esta tarefa tiver o mesmo ID da tarefa editada
      if (id === task.id) {
        // use a propagação de objetos para criar um novo objeto
        // cuja prop `completed` foi invertida
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  //Excluir
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  //Alterar
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  
  
  //Conta quantidade de tarefas e verifica se vai imprimir tarefas ou tarefa.  
  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  //Título do texto na tela
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);  

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
  
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      {taskList}
    </div>
  );
}
export default App;