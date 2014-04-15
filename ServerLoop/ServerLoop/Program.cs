using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ServerLoop
{
    class Program
    {
        static DB AAAPDatabase;
        static void Main(string[] args)
        {
            AAAPDatabase = new DB();
            while (true)
            {
                System.Threading.Thread.Sleep(60000);
                ServerClean();
            }
            
        }

        static void ServerClean()
        {

        }
    }

    class DB
    {
        public MySqlConnection connection;
        public string server = string.Empty;
        public string database = string.Empty;
        public string uid = string.Empty;
        public string password = string.Empty;
        public string port = string.Empty;

        string connectionString = string.Empty;
        

        public DB()
        {
            Initialize("localhost", "3306");
        }

        private void Initialize(string ip, string port)
        {
            server = "localhost";
            database = "aaapdata";
            uid = "paul";
            password = "1234567890!@#$%^&*()";
            string connectionString;
            connectionString = "SERVER=" + server + ";" + "PORT=" + port + ";" + "DATABASE=" + database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";" + "AllowZeroDateTime=true;";

            connection = new MySqlConnection(connectionString);

        }

        public bool OpenConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool CloseConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (MySqlException ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public List<string> SendQuery(string query)
        {
            List<string> returnList = new List<string>();

            if (this.OpenConnection() == true)
            {
                MySqlCommand cmd = new MySqlCommand(query, connection);

                if (query.ToLower().Contains("select"))
                {
                    MySqlDataReader dataReader = cmd.ExecuteReader();

                    while (dataReader.Read())
                    {
                        for (int i = 0; i < dataReader.FieldCount; i++)
                        {
                            returnList.Add(dataReader.GetName(i) + " : " + dataReader.GetValue(i) + "\n");
                        }
                        returnList.Add("\n");
                    }
                }
                else
                {
                    cmd.ExecuteNonQuery();
                }

                this.CloseConnection();
            }
            else
            {
                returnList.Add("Unable to Connect  to SQL Server");
            }

            return returnList;
        }
    }
}
