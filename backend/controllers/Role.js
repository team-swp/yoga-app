const Role = require("../models/roles");

module.exports.addRole = async (req, res) => {
  const {
    rolename,
    description,
    meta_data,
  } = req.body;
  try {
    const newRole = new Role({
      rolename: rolename,
      description,
      meta_data: meta_data || "", //to side data
    });
    // return save result as a response
    newRole
      .save()
      .then((result) => res.status(201).send({ msg: "Add Role Successfully" }))
      .catch((error) => res.status(500).send({ error: error.message }));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getRoleById = async (req, res, next) => {
  let role;
  try {
    role = await Role.findById(req.body._id);
    if (role === null) {
      return res.status(404).json({ message: "Cannot Find Role" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.role = role;
  next();
};

module.exports.updateRole = async (req, res) => {
  const fieldsToUpdate = [
    "rolename",
    "description",
    "meta_data",
    "status"
  ];

  for (const field of fieldsToUpdate) {
    if (req.body[field] != null) {
      res.role[field] = req.body[field];
    }
  }
  try {
    const updateRole = await res.role.save();
    res.json(updateRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};