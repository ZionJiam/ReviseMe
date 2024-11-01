const express = require('express');
const router = express.Router();
const Group = require('../models/group');


/**
 * @swagger
 * tags:
 *   name: Groups
 *   description: The groups managing API
 */

/**
 * @swagger
 * /groups:
 *   post:
 *     summary: Create a new study group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: The group was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Some server error
 */
router.post('/', async (req, res) => {
    try {
        const { name, ownerId } = req.body;
        const newGroup = new Group({ name, ownerId, members: [ownerId], decks: [] });
        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}:
 *   put:
 *     summary: Update a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The group was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.put('/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { name } = req.body;
        const group = await Group.findOneAndUpdate({ _id: groupId }, { name }, { new: true });
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}/invite:
 *   post:
 *     summary: Invite a user to join the group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The user was successfully invited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.post('/:groupId/invite', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        const newUsers = userIds.filter(id => !group.members.includes(id));
        group.members.push(...newUsers);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}/remove:
 *   delete:
 *     summary: Remove users from the group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The user was successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:groupId/remove', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { userIds } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        if (userIds.includes(group.ownerId)) {
            return res.status(400).json({ error: 'Cannot remove owner from group' });
        }
        group.members = group.members.filter(member => !userIds.includes(member));
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups:
 *   get:
 *     summary: Get all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: The list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some server error
 */
router.get('/', async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}:
 *   get:
 *     summary: Get group details, including shared decks
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     responses:
 *       200:
 *         description: The group details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.get('/:groupId', async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}/decks:
 *   post:
 *     summary: Share a flashcard deck with the group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deckId:
 *                 type: string
 *     responses:
 *       200:
 *         description: The deck was successfully shared
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.post('/:groupId/decks', async (req, res) => {
    try {
        const { groupId } = req.params;
        const { deckId } = req.body;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        group.decks.push(deckId);
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups/{groupId}/decks/{deckId}:
 *   delete:
 *     summary: Remove a flashcard deck from the group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: The group id
 *       - in: path
 *         name: deckId
 *         schema:
 *           type: string
 *         required: true
 *         description: The deck id
 *     responses:
 *       200:
 *         description: The deck was successfully removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The group was not found
 *       500:
 *         description: Some server error
 */
router.delete('/:groupId/decks/:deckId', async (req, res) => {
    try {
        const { groupId, deckId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        group.decks = group.decks.filter(deck => !deck.equals(deckId));
        await group.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /groups:
 *   delete:
 *     summary: Delete all groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: All groups deleted
 *       404:
 *         description: No groups found
 *       500:
 *         description: Some server error
 */
router.delete('/', async (req, res) => {
    try {
        await Group.deleteMany({});
        res.json({ message: 'All groups deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;