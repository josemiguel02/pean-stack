import Department from '../models/Department.js'

export const listDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll()
    res.status(200).json(departments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addDepartment = async (req, res) => {
  const { name } = req.body

  try {
    const newDepartment = await Department.create({ name })
    res.status(200).json(newDepartment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const editDepartment = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  try {
    const [, editedDepartment] = await Department.update(
      { name },
      {
        where: { id },
        returning: true
      }
    )

    res.status(200).json(editedDepartment[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteDepartment = async (req, res) => {
  const { id } = req.params

  try {
    await Department.destroy({ where: { id } })

    res.status(200).json({ msg: 'Department deleted..' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
