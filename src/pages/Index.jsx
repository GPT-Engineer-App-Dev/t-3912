import React, { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, IconButton, Box, Heading } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskInput, setEditTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { id: uuidv4(), text: taskInput }]);
    setTaskInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditTaskId(id);
    setEditTaskInput(taskToEdit.text);
  };

  const handleSaveEditTask = () => {
    setTasks(tasks.map((task) => (task.id === editTaskId ? { ...task, text: editTaskInput } : task)));
    setEditTaskId(null);
    setEditTaskInput("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        "Task Master 3000: Conquer Your To-Do List with a Smile!"
      </Heading>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <Button onClick={handleAddTask} colorScheme="purple">Add Task</Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {tasks.map((task) => (
            <HStack key={task.id} width="100%" justifyContent="space-between">
              {editTaskId === task.id ? (
                <HStack width="100%">
                  <Input
                    value={editTaskInput}
                    onChange={(e) => setEditTaskInput(e.target.value)}
                  />
                  <Button onClick={handleSaveEditTask} colorScheme="teal">Save</Button>
                </HStack>
              ) : (
                <>
                  <Text>{task.text}</Text>
                  <HStack>
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      onClick={() => handleEditTask(task.id)}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrash />}
                      onClick={() => handleDeleteTask(task.id)}
                    />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;