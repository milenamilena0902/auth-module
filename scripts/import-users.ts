import * as fs from 'fs';
import { connect } from 'mongoose';
import { User } from 'src/user/user.schema'; // Adjust the path as needed
import { UserDocument } from 'src/user/user.schema';

const importData = async () => {
  try {
    await connect('mongodb://localhost:27017/your-database-name'); // Replace with your DB name

    const usersData = JSON.parse(fs.readFileSync('path/to/users.json', 'utf8'));

    await User.insertMany(usersData); // Make sure to adjust based on your User schema
    console.log('Data imported successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    process.exit();
  }
};

importData();
