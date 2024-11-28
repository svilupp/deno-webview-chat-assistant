<script setup lang="ts">
import { ref } from 'vue'

const userInput = ref('')
const response = ref('')
const loading = ref(false)
const messages = ref<{ role: string, content: string }[]>([])

async function handleSubmit() {
  if (!userInput.value.trim()) return
  
  loading.value = true
  try {
    const userMessage = { role: 'user', content: userInput.value }
    messages.value = [...messages.value, userMessage]

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages.value.map(msg => ({
          role: msg.role === 'bot' ? 'assistant' : msg.role,
          content: msg.content
        }))
      })
    })
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }
    
    const data = await res.json()
    if (data.choices && data.choices[0]?.message?.content) {
      const botMessage = { role: 'bot', content: data.choices[0].message.content }
      messages.value.push(botMessage) // Append bot response to history
      response.value = data.choices[0].message.content;
      userInput.value = '';
    } else {
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Error:', error)
    response.value = `Error: ${error.message || 'An error occurred while fetching response'}`
  } finally {
    loading.value = false
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleSubmit()
  }
}

function resetConversation() {
  messages.value = [] // Clear the conversation history
  response.value = ''
}
</script>

<template>
  <div class="container">
    <h1>Mini Chat Assistant</h1>
    
    <div class="chat-container">
      <textarea 
        v-model="userInput"
        @keydown="handleKeydown"
        placeholder="Type your message here..."
        rows="4"
      ></textarea>
      <div class="button-container">
        <button 
          @click="handleSubmit"
          :disabled="loading"
        >
          {{ loading ? 'Sending...' : 'Submit' }}
        </button>
        <button @click="resetConversation" class="reset-button">Reset</button>
      </div>
      
      <div v-if="messages.length" class="conversation">
        <h3>Conversation:</h3>
        <div class="messages-container">
          <div 
            v-for="(message, index) in messages" 
            :key="index" 
            :class="['message-card', message.role]"
          >
            <strong>{{ message.role === 'user' ? 'You' : 'Bot' }}:</strong> 
            <div class="message-content">{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.logos {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.chat-container {
  margin-top: 2rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
}

button {
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.conversation {
  margin-top: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #eee;
}

.messages-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message-card {
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message-card.user {
  background-color: #f0f0f0;
  margin-left: 1rem;
  color: #000;
}

.message-card.bot {
  background-color: #e8f5f0;
  margin-right: 1rem;
  color: #2c3e50;
}

.message-content {
  margin-top: 0.25rem;
  white-space: pre-wrap;
}

h1 {
  text-align: center;
  color: #42b883;
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;
}

.reset-button {
  background-color: #666;
}

.reset-button:hover {
  background-color: #777;
}

button:hover {
  background-color: #3aa876;
}
</style>
