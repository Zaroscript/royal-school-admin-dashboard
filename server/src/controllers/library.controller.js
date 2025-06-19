import Library from '../models/library.model.js';

// Create a new library resource
export const createLibraryResource = async (req, res) => {
  try {
    const resource = new Library(req.body);
    await resource.save();

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all library resources
export const getAllLibraryResources = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'title', sortOrder = 'asc' } = req.query;

    const resources = await Library.find()
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Library.countDocuments();

    res.status(200).json({
      success: true,
      data: resources,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get library resource by ID
export const getLibraryResourceById = async (req, res) => {
  try {
    const resource = await Library.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Library resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update library resource
export const updateLibraryResource = async (req, res) => {
  try {
    const resource = await Library.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Library resource not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete library resource
export const deleteLibraryResource = async (req, res) => {
  try {
    const resource = await Library.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Library resource not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Library resource deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get library resources by category
export const getLibraryResourcesByCategory = async (req, res) => {
  try {
    const resources = await Library.find({ category: req.params.category })
      .sort({ title: 1 });

    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Search library resources
export const searchLibraryResources = async (req, res) => {
  try {
    const { q, category, type } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    const resources = await Library.find(query).sort({ title: 1 });

    res.status(200).json({
      success: true,
      data: resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 