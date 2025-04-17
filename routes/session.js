const express = require('express');
const { db, bucket } = require('../firebase');
const router = express.Router();

// Route to start a session
router.post('/start', async (req, res) => {
  const { userId } = req.body;
  try {
    const sessionRef = db.collection('users').doc(userId).collection('sessions').doc();
    await sessionRef.set({
      sessionId: sessionRef.id,
      startTime: new Date(),
      status: 'active',
    });
    res.status(200).json({ message: 'Session started', sessionId: sessionRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error starting session' });
  }
});

// Route to end a session
router.post('/end', async (req, res) => {
  const { userId, sessionId, aiResult, audioUrl, videoUrl } = req.body;
  try {
    const sessionRef = db.collection('users').doc(userId).collection('sessions').doc(sessionId);
    await sessionRef.update({
      endTime: new Date(),
      status: 'ended',
      audioUrl,
      videoUrl,
      aiAnalysis: aiResult
    });
    res.status(200).json({ message: 'Session ended and data saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error ending session' });
  }
});

// ✅ Route to get all sessions for a user
router.get('/:userId/sessions', async (req, res) => {
  const { userId } = req.params;
  try {
    const sessionsSnapshot = await db.collection('users').doc(userId).collection('sessions').get();
    const sessions = sessionsSnapshot.docs.map(doc => doc.data());
    res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sessions' });
  }
});

// ✅ Route to get specific session for a user
router.get('/:userId/sessions/:sessionId', async (req, res) => {
  const { userId, sessionId } = req.params;
  try {
    const sessionDoc = await db.collection('users').doc(userId).collection('sessions').doc(sessionId).get();
    if (!sessionDoc.exists) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json({ session: sessionDoc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching session data' });
  }
});

// ✅ Route to get user data (metadata, profile etc.)
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: userDoc.data() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;
