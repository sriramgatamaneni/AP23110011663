# Stage 1

## APIs

GET /notifications  
POST /notifications  
PATCH /notifications/{id}/read  

## Real-time
Use WebSockets for instant notifications

---

# Stage 2

## Database
MongoDB

## Schema
{
  id,
  studentId,
  type,
  message,
  isRead,
  timestamp
}

---

# Stage 3

Problem:
Query slow due to no indexing

Solution:
CREATE INDEX idx_student_read_time
ON notifications(studentID, isRead, createdAt DESC);

---

# Stage 4

Solutions:
- Redis caching
- Pagination
- Lazy loading

---

# Stage 5

Problems:
- Sequential execution
- No retry

Solution:
Use Queue (Kafka/RabbitMQ)

Pseudo code:
function notify_all(ids):
  push to queue

worker:
  save_to_db
  send_email
  push_notification

---

# Stage 6

Priority:
Placement > Result > Event
Sort by timestamp
