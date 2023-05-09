import Client from '../models/Client.js'

export const listClient = async (req, res) => {
  try {
    const clients = await Client.findAll()
    res.status(200).json(clients)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const addCLient = async (req, res) => {
  const { firstname, lastname, idDepartment } = req.body

  try {
    const newClient = await Client.create({
      firstname,
      lastname,
      id_department: idDepartment
    })
    res.status(200).json(newClient)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const editCLient = async (req, res) => {
  const { id } = req.params
  const { firstname, lastname, idDepartment } = req.body

  try {
    const [, editedClient] = await Client.update(
      { firstname, lastname, id_department: idDepartment },
      {
        where: { id },
        returning: true
      }
    )

    res.status(200).json(editedClient[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteCLient = async (req, res) => {
  const { id } = req.params

  try {
    await Client.destroy({ where: { id } })
    res.status(200).json({ msg: 'Client deleted..' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
