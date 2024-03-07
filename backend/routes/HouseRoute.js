import express from "express";
import { House } from "../models/HouseModule.js";
import { User } from "../models/Users.js";
const router = express.Router();

//post
router.post("/house", async (req, res) => {
  try {
    if (
      !req.body.topic ||
      !req.body.price ||
      !req.body.bedrooms ||
      !req.body.address ||
      !req.body.bathrooms ||
      !req.body.description ||
      !req.body.contactno ||
      !req.body.Image ||
      !req.body.userOwner
    ) {
      return res.status(400).send({ message: "Please enter all information" });
    }

    const newHouse = {
      topic: req.body.topic,
      price: req.body.price,
      bedrooms: req.body.bedrooms,
      address: req.body.address,
      bathrooms: req.body.bathrooms,
      description: req.body.description,
      contactno: req.body.contactno,
      Image: req.body.Image,
      userOwner: req.body.userOwner,
    };
    const house = await House.create(newHouse);
    return res.status(200).send(house);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
});
//getall
router.get("/house", async (req, res) => {
  try {
    const house = await House.find({});
    return res.status(200).json({ count: house.length, data: house });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
//getbyid
router.get("/house/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);
    return res.status(200).json(house);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
//update
router.put("/housee/:id", async (req, res) => {
  try {
    if (
      !req.body.topic ||
      !req.body.price ||
      !req.body.bedrooms ||
      !req.body.address ||
      !req.body.bathrooms ||
      !req.body.description ||
      !req.body.contactno ||
      !req.body.Image ||
      !req.body.userOwner
    ) {
      return res.status(400).send({ message: "Please enter all information" });
    }
    const { id } = req.params;
    const result = await House.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "House not found" });
    }
    return res.status(200).send({ message: "house updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
//delete
router.delete("/house/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await House.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "House not found" });
    }
    return res.status(200).send({ message: "house deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});
// Save a house
router.put("/save", async (req, res) => {
  try {
    const house = await House.findById(req.body.houseId);
    const user = await User.findById(req.body.userId);
    user.savedHouse.push(house);
    await user.save();
    res.json({ savedHouse: user.savedHouse });
  } catch (error) {
    res.json(error);
  }
});
// Get id of saved house
router.get("/savedHouse/ids/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(201).json({ savedHouse: user?.savedHouse });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved house
router.get("/savedHouse/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const savedHouse = await House.find({
      _id: { $in: user.savedHouse },
    });

    console.log(savedHouse);
    res.status(201).json({ savedHouse });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get houses entered by the owner
router.get("/houses/user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const houses = await House.find({ userOwner: userID });
    res.status(200).json(houses);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching houses entered by the owner." });
  }
});

// Update house entered by the owner

router.put("/house/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate if the user is authorized to update this house
    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    if (house.userOwner.toString() !== updates.userOwner) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this house" });
    }

    // Update only the fields that are allowed to be updated
    const allowedUpdates = [
      "topic",
      "price",
      "bedrooms",
      "address",
      "bathrooms",
      "description",
      "contactno",
      "Image",
    ];
    Object.keys(updates).forEach((update) => {
      if (allowedUpdates.includes(update)) {
        house[update] = updates[update];
      }
    });

    // Save the updated house
    await house.save();
    res.status(200).json(house);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating house" });
  }
});

// Delete house entered by the owner
router.delete("/house/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findById(id);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }
    if (house.userOwner !== req.body.userOwner) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this house." });
    }
    await House.findByIdAndDelete(id);
    res.status(200).json({ message: "House deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting house." });
  }
});

export { router as HouseRouter };
